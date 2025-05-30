class Esfera extends Sprite{
    constructor(options = {}){
        super(options)

        this.angleUpdateValue = options.angleUpdateValue || 1
        this.player = options.player
        this.angle = options.angle || 0
        this.distancia = options.distancia || 0
    }

    draw(){
        ctx.beginPath()
        ctx.arc(
            this.x,     
            this.y, 
            this.radius, 
            0, Math.PI*2,
            false
            )
        ctx.fillStyle = this.color
        ctx.fill()
    }

    update(){
        this.draw()

        this.angle += this.angleUpdateValue

        if(Math.abs(this.angle) >= Math.PI*2){
            this.angle = 0
        }

        this.x = this.player.x + Math.cos(this.angle) * (this.player.radius + this.distancia)
        this.y = this.player.y + Math.sin(this.angle) * (this.player.radius + this.distancia)
    }
}


const satelite = new Esfera({
    x: planeta.x + Math.cos(0) * planeta.radius,
    y: planeta.y + Math.sin(0) * planeta.radius,
    radius: 4,
    angleUpdateValue: 0.01,
    player: planeta,
    distancia: 100
})

const alvo = new Esfera({
    x: planeta.x + Math.cos(0) * planeta.radius,
    y: planeta.y + Math.sin(0) * planeta.radius,
    radius: 4,
    angleUpdateValue: 0.1,
    player: planeta,
    color: 'transparent',
    distancia: 60,
})

function checkSatelite(){
    for(let e = enemies.length - 1; e >= 0; e--){
        const enemy = enemies[e];

        const distance = Math.hypot(satelite.x - enemy.x, satelite.y - enemy.y)

        //colisão satelite -> inimigo
        if(distance < satelite.radius + enemy.radius){
            if(enemy.radius > 15){
                enemy.newRadius = enemy.radius - 10
            }else{
                enemies.splice(e, 1)
            }
            // enemies.splice(e, 1)

            score += 50 - Math.floor(enemy.radius)

            text_score.innerText = `PONTUAÇÃO: ${score}`

            criarParticulas(enemy, satelite)
        }
    }
}