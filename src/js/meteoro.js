class Meteoro extends Sprite{
    constructor(options = {}){
        super(options)

    
        this.newRadius = options.radius

        this.velocity = options.velocity || {x: 0, y: 0}
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
    }
}

function criarMeteoros(){
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

            enemies.push(new Meteoro({
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

function checkMeteoros(){
    enemies.forEach((enemy)=>{
        enemy.update()

        const distance = Math.hypot(player.x - enemy.x, player.y - enemy.y)

        if(distance < player.radius + enemy.radius){
            //alert('game over')
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
            console.log(enemies.length)
        }
    }
}
