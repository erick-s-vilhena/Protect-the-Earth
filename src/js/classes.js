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

class Player extends Sprite{
    constructor(options = {}){
        super(options)

        this.s1 = new Sphere({
            x: this.x + Math.cos(0) * this.radius,
            y: this.y + Math.sin(0) * this.radius,
            radius: 4,
            angleUpdateValue: 0.05,
            player: this
        })

    }

    update(){
        this.draw()
        this.s1.update();
        //this.s2.update();
    }
}

class Sphere extends Sprite{
    constructor(options = {}){
        super(options)

        this.angleUpdateValue = options.angleUpdateValue || 1
        this.player = options.player
        this.angle = options.angle || 0
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

        this.x = this.player.x + Math.cos(this.angle) * (this.player.radius + 20)
        this.y = this.player.y + Math.sin(this.angle) * (this.player.radius + 20)
    }
}

class Projectile extends Sphere{
    constructor(options = {}){
        super(options)

        this.velocity = options.velocity || {x: 0, y: 0}
    }
    
    update(){
        this.draw()

        this.x += this.velocity.x
        this.y += this.velocity.y
    }
}

class Enemy extends Sprite{
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

class Particle extends Projectile{
    constructor(options = {}){
        super(options)

        this.alpha = 1
    }

    draw(){
        ctx.save()

        ctx.globalAlpha = this.alpha
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, false)
        ctx.fillStyle = this.color
        ctx.fill()

        ctx.restore()

        
    }

    update(){
        this.draw()
        this.alpha -= 0.02

        this.x += this.velocity.x
        this.y += this.velocity.y

        this.velocity.x *= .96
        this.velocity.y *= .96
    }
}

class Estrelas{
    constructor({
        x = 0, 
        y = 0, 
        size = 1, 
        alpha = 1
    } = {}){
        this.x = x
        this.y = y
        this.size = size
        this.alpha = alpha
        this.alphaOriginal = alpha
        this.piscando = false

        this.iniciarPiscada();
    }

    draw(){
        
        ctx.save();  // Salva o estado atual
        
        ctx.globalAlpha = this.alpha

        ctx.translate(this.x, this.y);             // Move a origem para o centro do canvas
        ctx.rotate(45 * Math.PI / 180);  // Rotaciona 45 graus (em radianos)
        ctx.fillStyle = '#fff';
        ctx.fillRect( 0 , 0 , this.size, this.size); // Desenha centralizado
        ctx.restore(); 
    }

    update(){
        this.draw()
    }

    iniciarPiscada(){
        setTimeout(()=>{
            this.piscar();

            this.iniciarPiscada();
        }, Math.random() * 3000 + 1000)
    }

    piscar(){
        this.alpha = this.alphaOriginal - 0.2

        setTimeout(()=>{
            this.alpha = this.alphaOriginal;
        }, 200 + Math.random() * 300)
    }
}