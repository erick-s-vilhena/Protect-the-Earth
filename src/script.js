const cnv = document.getElementById('myCanvas');
cnv.width = innerWidth;
cnv.height = innerHeight;

const ctx = cnv.getContext('2d')

const imagemTerra = new Image();
imagemTerra.src = './src/img/terra.svg'; 

const player = new Player({
    x: cnv.width/2, 
    y: cnv.height/2, 
    radius: 40, 
    img: imagemTerra, 
    rotacao: 5
});

const estrela = new Estrelas(101, 210, 2)

const shootingSpeed = 4

let projectiles = [];
let enemies = [];
let particles = [];
let fundo = [];
let intervalID;

window.addEventListener('resize', () => {
  location.reload();
});

window.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        e.preventDefault()

        disparo();
    }
})

cnv.addEventListener('click', (e) => {
    e.preventDefault()
    
    disparo();
})


function loop(){
    requestAnimationFrame(loop, cnv);

    update();
}

function update(){
    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.fillRect(0, 0, cnv.width, cnv.height)

    checkEstrelas()
    checkInimigos()
    checkProjetil()
    checkParticulas()
    player.update()
    estrela.update();
}

function criarEstrelas(){
    for(let i = 1; i <= 200; i++){

        let posX = Math.random() * cnv.width;
        let posY = Math.random() * cnv.height;

        let tamanho = parseFloat((0.8 + Math.random() * 1.2).toFixed(2));

        let alpha = 0.2 + Math.random() * (1 - 0.2);

        fundo.push(new Estrelas({
                            x: posX, 
                            y: posY, 
                            size: tamanho, 
                            alpha: alpha
                        }))
    }
}

function checkEstrelas(){
    fundo.forEach(estrela =>{
        estrela.update()
    })
}

function spawnInimigos(){
    intervalID = setInterval(()=>{
        if(enemies.length < 15){
            const radius = Math.floor(Math.random() * 26) + 10

            let posX, posY;

            if(Math.random() < 0.5){

                posX = Math.random() < 0.5 ? 0 - radius : cnv.width + radius

                posY = Math.random() * cnv.height

            }else{

                posX = Math.random() * cnv.width

                posY = Math.random() < 0.5 ? 0 - radius : cnv.height + radius
            }

            const angle = Math.atan2(player.y - posY, player.x - posX)

            const velocity = {
                x: Math.cos(angle),
                y: Math.sin(angle)
            }

            const color = 'hsl('+ Math.random() * 360 +', 50%, 50%)';

            enemies.push(new Enemy({
                                x: posX, 
                                y: posY, 
                                radius: radius, 
                                color: color, 
                                img: imagemTerra, 
                                rotacao: 20, 
                                velocity: velocity
                            }))
        }

        //console.log(enemies.length)
    }, 2000)
}

function disparo(){
    const angle = Math.atan2(-(player.y - player.s1.y), -(player.x - player.s1.x))

    const velocity = {
        x: Math.cos(angle) * shootingSpeed,
        y: Math.sin(angle) * shootingSpeed
    }

    projectiles.push(new Projectile({
                                x: player.s1.x, 
                                y: player.s1.y, 
                                radius: 5,
                                velocity: velocity
                            })) 

    player.s1.angleUpdateValue = -player.s1.angleUpdateValue
}

function checkProjetil(){
    for(let i = projectiles.length - 1; i >= 0; i--){
        const pro = projectiles[i]
        pro.update()

        checkProjetilForaDaTela(pro, i);

        for(let e = enemies.length - 1; e >= 0; e--){
            const enemy = enemies[e];

            const distance = Math.hypot(pro.x - enemy.x, pro.y - enemy.y)

            //colisão projetil -> inimigo
            if(distance < pro.radius + enemy.radius){
                if(enemy.radius > 15){
                    enemy.newRadius = enemy.radius - 10
                }else{
                    enemies.splice(e, 1)
                }
               // enemies.splice(e, 1)
                
                projectiles.splice(i, 1)

                criarParticulas(enemy)
            }
        }
    }
}

function checkProjetilForaDaTela(projectile, index){
    if(projectile.x + projectile.radius < 0 ||
        projectile.x - projectile.radius > cnv.width ||
        projectile.y + projectile.radius < 0 ||
        projectile.y - projectile.radius > cnv.height
    ){
        projectiles.splice(index, 1)
        //console.log(projectiles.length)
    }
}

function checkInimigos(){
    enemies.forEach((enemy)=>{
        enemy.update()

        const distance = Math.hypot(player.x - enemy.x, player.y - enemy.y)

        if(distance < player.radius + enemy.radius){
            //alert('game over')
        }
    })

    checkInimigosForaDaTela();
}

function checkInimigosForaDaTela(){
    for(let i = enemies.length - 1; i >= 0; i--){
        const ene = enemies[i]

        if(ene.x + ene.radius < 0 ||
        ene.x - ene.radius > cnv.width ||
        ene.y + ene.radius < 0 ||
        ene.y - ene.radius > cnv.height
        ){
            enemies.splice(i, 1)
            console.log(enemies.length)
        }
    }
}

function criarParticulas(enemy){
    for(let i = 0; i < enemy.radius * 2; i++){
        const velocity = {
            x: (Math.random() - 0.5) * (Math.random() * 6),
            y: (Math.random() - 0.5) * (Math.random() * 6)
        }

        const size = Math.random()*2

        const hue = 20 + Math.random() * 30; // 20 (vermelho-alaranjado) até 50 (amarelo)
        const saturation = 90 + Math.random() * 10; // 90% a 100%
        const lightness = 40 + Math.random() * 20; // 40% a 60%

        const color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;

        particles.push(new Particle({
                                x: enemy.x, 
                                y: enemy.y, 
                                radius: size, 
                                color: color, 
                                velocity: velocity
                            }))
    }
}

function checkParticulas(){
    for(let i = particles.length - 1; i >= 0; i--){
        const par = particles[i]

        par.update()

        if(par.alpha <= 0){
            particles.splice(i, 1)
        }
    }
}

loop();
spawnInimigos();
criarEstrelas();
