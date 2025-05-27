class Terra extends Sprite{
    constructor(options = {}){
        super(options)

        this.s1 = new Esfera({
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
    }
}

const imagemTerra = new Image();
imagemTerra.src = './src/img/terra.svg';

const player = new Terra({
    x: cnv.width/2, 
    y: cnv.height/2, 
    radius: 40, 
    img: imagemTerra, 
    rotacao: 5
});


