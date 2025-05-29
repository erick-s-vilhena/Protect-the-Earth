class Particula extends Projetil{
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


function criarParticulas(meteoro, projetil){
    for(let i = 0; i < meteoro.radius * 2; i++){
        const velocity = {
            x: (Math.random() - 0.5) * (Math.random() * 6),
            y: (Math.random() - 0.5) * (Math.random() * 6)
        }

        const size = Math.random()*2

        const hue = 20 + Math.random() * 30; // 20 (vermelho-alaranjado) até 50 (amarelo)
        const saturation = 90 + Math.random() * 10; // 90% a 100%
        const lightness = 40 + Math.random() * 20; // 40% a 60%

        const color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;

        particles.push(new Particula({
                                x: projetil.x, 
                                y: projetil.y, 
                                radius: size, 
                                color: color, 
                                velocity: velocity
                            }))
    }
}

function checkParticulas(){
    for(let i = particles.length - 1; i >= 0; i--){
        const par = particles[i]

        par.update()

        if(par.alpha <= 0){
            particles.splice(i, 1)
        }
    }
}
