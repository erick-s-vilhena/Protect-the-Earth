class Meteoro extends Sprite{
    constructor(options = {}){
        super(options)

        this.newRadius = options.radius

        this.velocity = options.velocity || {x: 0, y: 0}

   }

    encolher(){
        if(this.newRadius < this.radius){
            this.radius -= .5
            this.imgW = this.radius * 2
            this.imgH = this.radius * 2
        }
    }

    update(){
        this.encolher()
        this.draw()
        this.x += this.velocity.x
        this.y += this.velocity.y
    }
}

const meteoro_1 = new Image();
meteoro_1.src = './src/img/meteoro-branco.svg';

const meteoro_2 = new Image();
meteoro_2.src = './src/img/meteoro-cinza.svg';

const meteoro_3 = new Image();
meteoro_3.src = './src/img/meteoro-roxo.svg';


function criarMeteoros(){
    if(frameMeteoro < tempoCriarMeteoro){
        frameMeteoro += 1
    }else{
        frameMeteoro = 0
    }

    if(enemies.length < 15 && frameMeteoro == 30){
        const radius = cnv.width > 600 ? Math.floor(Math.random() * 26) + 10
        :
        Math.floor(Math.random() * 20) + 10

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

        let sprite_meteoro = Math.floor(1 + Math.random() * (4 - 1))
        
        if(sprite_meteoro == 1){
            img = meteoro_1
        }
        else if(sprite_meteoro == 2){ 
            img = meteoro_2
        }
        else{
            img = meteoro_3
        }

        const color = 'hsl('+ Math.random() * 360 +', 50%, 50%)';

        enemies.push(new Meteoro({
                            x: posX, 
                            y: posY, 
                            radius: radius,
                            color: color, 
                            img: img,
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
        if(distancia_meteoro_nave < jogador.radius + enemy.radius && !jogador.morreu){
            playSons(explosao)

            enemies.splice(index, 1)

            criarParticulas(enemy, jogador)

            criarParticulas(enemy, enemy)

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

