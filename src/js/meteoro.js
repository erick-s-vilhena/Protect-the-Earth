class Meteoro extends Sprite{
    constructor(options = {}){
        super(options)

    
        this.newRadius = options.radius

        this.velocity = options.velocity || {x: 0, y: 0}

        this.img = meteoroGrande

   }

    enconher(){
        if(this.newRadius < this.radius){
            this.radius -= .5
            this.imgW -= .5
            this.imgH -= .5
        }
    }

    update(){
        this.enconher()
        this.draw()
        this.x += this.velocity.x
        this.y += this.velocity.y

        if(this.radius < 28 && this.radius > 12 ){
            this.img = meteoroMedio
        }

        if(this.radius <= 12){
            this.img =  meteoroPequeno
        }
    }
}

const meteoroGrande = new Image();
meteoroGrande.src = './src/img/meteoro-grande.svg';

const meteoroMedio = new Image();
meteoroMedio.src = './src/img/meteoro-medio.svg';

const meteoroPequeno = new Image();
meteoroPequeno.src = './src/img/meteoro-pequeno.svg';

function criarMeteoros(){
    if(frameMeteoro < tempoCriarMeteoro){
        frameMeteoro += 1
    }else{
        frameMeteoro = 0
    }

    if(enemies.length < 15 && frameMeteoro == 30){
        const radius = Math.floor(Math.random() * 26) + 10

        let posX, posY;

        if(Math.random() < 0.5){

            posX = Math.random() < 0.5 ? 0 - radius : cnv.width + radius

            posY = Math.random() * cnv.height

        }else{

            posX = Math.random() * cnv.width

            posY = Math.random() < 0.5 ? 0 - radius : cnv.height + radius
        }

        const angle = Math.atan2(alvo.y - posY, alvo.x - posX)

        const velocity = {
            x: Math.cos(angle),
            y: Math.sin(angle)
        }

        const color = 'hsl('+ Math.random() * 360 +', 50%, 50%)';

        enemies.push(new Meteoro({
                            x: posX, 
                            y: posY, 
                            radius: radius, 
                            color: color, 
                            //img: img,
                            rotacao: 20, 
                            velocity: velocity
                        }))
    }
}

function checkMeteoros(){
    enemies.forEach((enemy, index)=>{
        enemy.update()

        const distancia_meteoro_planeta = Math.hypot(planeta.x - enemy.x, planeta.y - enemy.y)

        //colião meteoro -> planeta
        if(distancia_meteoro_planeta < planeta.radius + enemy.radius){
            playSons(explosao) 

            let dano = barraDeVida.offsetWidth - ((barraTotalDeVida * enemy.radius)/ 100)

            if(dano <= 0){
                barraDeVida.style.width = '0px'
                fimJogo();
            } 
            else{
                barraDeVida.style.width = `${dano}px`

                if(enemy.radius > 15){
                        enemy.newRadius = enemy.radius - 10
                    }else{
                        enemies.splice(index, 1)
                }

                criarParticulas(enemy, planeta)
            } 
        }

        const distancia_meteoro_nave = Math.hypot(jogador.x - enemy.x, jogador.y - enemy.y)

        //colião meteoro -> jogador
        if(distancia_meteoro_nave < jogador.radius + enemy.radius){
            playSons(explosao)

            if(enemy.radius > 15){
                    enemy.newRadius = enemy.radius - 10
                }else{
                    enemies.splice(index, 1)
            }

            criarParticulas(enemy, jogador)

            jogador.morreu = true
        }
    })

    checkMeteorosForaDaTela();
}

function checkMeteorosForaDaTela(){
    for(let i = enemies.length - 1; i >= 0; i--){
        const ene = enemies[i]

        if(ene.x + ene.radius < 0 ||
        ene.x - ene.radius > cnv.width ||
        ene.y + ene.radius < 0 ||
        ene.y - ene.radius > cnv.height
        ){
            enemies.splice(i, 1)
        }
    }
}

