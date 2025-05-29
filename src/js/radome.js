class Radome extends Esfera{
    constructor(options = {}){
        super(options)

        
    }

    update(){
        this.draw()

        this.angle += this.angulo * 0.001

        if(Math.abs(this.angle) >= Math.PI*2){
            this.angle = 0
        }

        this.x = this.player.x + Math.cos(this.angle) * (this.player.radius)
        this.y = this.player.y + Math.sin(this.angle) * (this.player.radius)
    }
}