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