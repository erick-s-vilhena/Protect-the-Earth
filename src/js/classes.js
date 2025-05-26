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
    constructor(x, y, radius, color){
        super(x, y, radius, color)

        this.coreRadius = radius;

        this.s1 = new Sphere(
            this.x + Math.cos(0) * this.radius,
            this.y + Math.sin(0) * this.radius,
            2,
            '#48fcff',
            0.02,
            0,
            this
        )

        this.s2 = new Sphere(
            this.x + Math.sin(0) * this.radius,
            this.y + Math.cos(0) * this.radius,
            2,
            '#48fcff',
            0.02,
            Math.PI,
            this
        )
    }

    draw(){
        ctx.beginPath()
        ctx.arc(
            this.x,     
            this.y, 
            this.coreRadius, 
            0, Math.PI*2,
            false
            )
        ctx.strokeStyle = this.color
        ctx.stroke()
    }

    update(){
        this.draw()
        this.s1.update();
        this.s2.update();
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