const cnv = document.getElementById('myCanvas');
cnv.width = innerWidth;
cnv.height = innerHeight;

const ctx = cnv.getContext('2d')

const player = new Player(cnv.width/2, cnv.height/2, 30, '#48fcff')

const shootingSpeed = 4

let projectiles = [];
let enemies = [];
let particles = [];
let intervalID;

function spawnEnemies(){
    intervalID = setInterval(()=>{
        const radius = Math.floor(Math.random() * 26) + 5

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

        enemies.push(new Enemy(posX, posY, radius, color, velocity))

        //console.log(enemies.length)
    }, 2000)
}

cnv.addEventListener('click', (e)=>{
    e.preventDefault()

    const angle = Math.atan2(e.clientY - player.y, e.clientX - player.x)

    const velocity = {
        x: Math.cos(angle) * shootingSpeed,
        y: Math.sin(angle) * shootingSpeed
    }

    projectiles.push(new Projectile(player.x, player.y, 3, "#48fcff", velocity))

    //console.log(projectiles.length)
})

function loop(){
    requestAnimationFrame(loop, cnv);

    update();
}

function update(){
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.fillRect(0, 0, cnv.width, cnv.height)

    checkEnemies()
    checkProjetiles()
    checkParticles()
    player.update()
}

function checkProjetiles(){
    for(let i = projectiles.length - 1; i >= 0; i--){
        const pro = projectiles[i]
        pro.update()

        checkOffScreen(pro, i);

        for(let e = enemies.length - 1; e >= 0; e--){
            const enemy = enemies[e];

            const distance = Math.hypot(pro.x - enemy.x, pro.y - enemy.y)

            if(distance < pro.radius + enemy.radius){
                enemies.splice(e, 1)
                projectiles.splice(i, 1)

                createParticle(enemy, pro)
            }
        }
    }
}

function checkOffScreen(projectile, index){
    if(projectile.x + projectile.radius < 0 ||
        projectile.x - projectile.radius > cnv.width ||
        projectile.y + projectile.radius < 0 ||
        projectile.y - projectile.radius > cnv.height
    ){
        projectiles.splice(index, 1)
        //console.log(projectiles.length)
    }
}

function checkEnemies(){
    enemies.forEach((enemy)=>{
        enemy.update()

        const distance = Math.hypot(player.x - enemy.x, player.y - enemy.y)

        if(distance < player.radius + enemy.radius){
            //alert('game over')
        }
    })

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


function createParticle(enemy, projectile){
    for(let i = 0; i < enemy.radius * 2; i++){
        const velocity = {
            x: (Math.random() - 0.5) * (Math.random() * 6),
            y: (Math.random() - 0.5) * (Math.random() * 6)
        }

        const size = Math.random()*2

        particles.push(new Particle(enemy.x, enemy.y, Math.random()*2, enemy.color, velocity))
    }
}

function checkParticles(){
    for(let i = particles.length - 1; i >= 0; i--){
        const par = particles[i]

        par.update()

        if(par.alpha <= 0){
            particles.splice(i, 1)
        }
    }
}

loop();
spawnEnemies();