class Jogador extends Sprite{
    constructor(options = {}){
        super(options)

        this.velocity = options.velocity || {x: 0, y: 0}

        this.radome = new Radome({
            x: this.x,
            y: this.y - this.radius,
            radius: 4,
            angleUpdateValue: 0.05,
            player: this,
            angulo: this.angulo
        })
    }

    update(){
        this.draw()
        this.radome.update();
    }
}




const imagemNave = new Image();
imagemNave.src = './src/img/nave.svg';

let posXY = 0;

const jogador = new Jogador({
    x: planeta.x,
    y: planeta.y - planeta.radius - 20,
    radius: 50,
    img: imagemNave,
})

window.addEventListener('keydown', (e) => {
    if (e.code === 'KeyW') {
        e.preventDefault()

        jogador.y += -1
    }


    if (e.code === 'KeyA') {
        e.preventDefault()

        jogador.rotacao = -30
    }

    if (e.code === 'KeyD') {
        e.preventDefault()
        
        jogador.rotacao = 30
    }
})

window.addEventListener('keyup', (e) => {
    if (e.code === 'KeyW') {
        e.preventDefault()
    }


    if (e.code === 'KeyA') {
        e.preventDefault()

        jogador.rotacao = 0
    }

    if (e.code === 'KeyD') {
        e.preventDefault()

        jogador.rotacao = 0
    }
})