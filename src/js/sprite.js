class Sprite{
    constructor({
        x = 0, 
        y = 0, 
        radius = 10, 
        color = '#48fcff', 
        img = undefined,
        rotacao = 0
    } = {}){
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
        this.img = img
        this.rotacao = rotacao

        this.imgW = radius * 2
        this.imgH = radius * 2

        this.angulo = 0
    }

    draw(){
        ctx.save();

        ctx.beginPath()

        if(!this.img){
            ctx.arc(
                this.x,     
                this.y, 
                this.radius, 
                0, Math.PI*2,
                false
                )
            ctx.strokeStyle = this.color
            ctx.stroke()
        }
        
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angulo); 

        if(this.img !== undefined){
            ctx.drawImage(
                this.img,  
                -this.imgW/2,  
                -this.imgH/2, 
                this.imgW, 
                this.imgH
            );
        }

        ctx.restore();

        this.angulo += this.rotacao * 0.001
    }
}