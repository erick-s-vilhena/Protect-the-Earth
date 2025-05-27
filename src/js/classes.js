class Sprite{
    constructor(x, y, radius, color){
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
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
}

class Player extends Sprite{
    constructor(x, y, radius, color, img){
        super(x, y, radius, color)

        this.coreRadius = radius;

        this.img = img
        this.imgW = 80
        this.imgH = 80

        this.angulo = 0

        this.s1 = new Sphere(
            this.x + Math.cos(0) * this.radius,
            this.y + Math.sin(0) * this.radius,
            4,
            '#48fcff',
            0.05,
            0,
            this
        )

    }

    draw(){
        ctx.save();
        ctx.beginPath()
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angulo); 
        ctx.drawImage(this.img,  -this.imgW/2,  -this.imgH/2, this.imgW, this.imgW);
        ctx.strokeStyle = this.color
        ctx.stroke()
        ctx.restore();
        this.angulo += 0.005
    }

    update(){
        this.draw()
        this.s1.update();
        //this.s2.update();
    }
}

class Sphere extends Sprite{
    constructor(x, y, radius, color, angleUpdateValue, angle, player){
        super(x, y, radius, color)

        this.angleUpdateValue = angleUpdateValue
        this.player = player
        this.angle = angle
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

class Projectile extends Sprite{
    constructor(x, y, radius, color, velocity){
        super(x, y, radius, color)

        this.velocity = velocity
    }

    update(){
        this.draw()

        this.x += this.velocity.x
        this.y += this.velocity.y
    }
}

class Enemy extends Projectile{
    constructor(x, y, radius, color, velocity){
        super(x, y, radius, color, velocity)

        this.newRadius = radius
    }

    draw(){
        ctx.beginPath()
        ctx.arc(
            this.x, 
            this.y, 
            this.radius, 
            0, 
            Math.PI*2, 
            false)
        ctx.strokeStyle = this.color
        ctx.stroke()
    }

    shrink(){
        if(this.newRadius < this.radius){
            this.radius -= .5
        }
    }

    

    update(){
        this.shrink()
        this.draw()
        this.x += this.velocity.x
        this.y += this.velocity.y
    }
}

class Particle extends Projectile{
    constructor(x, y, radius, color, velocity){
        super(x, y, radius, color, velocity)

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
    constructor(x, y, size, alpha){
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