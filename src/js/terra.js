class Terra extends Sprite{
    constructor(options = {}){
        super(options)

        this.satelite = new Esfera({
            x: this.x + Math.cos(0) * this.radius,
            y: this.y + Math.sin(0) * this.radius,
            radius: 4,
            angleUpdateValue: 0.05,
            player: this,
            distancia: 20
        })

        this.alvo = new Esfera({
            x: this.x + Math.cos(0) * this.radius,
            y: this.y + Math.sin(0) * this.radius,
            radius: 4,
            angleUpdateValue: 0.1,
            player: this,
            color: 'transparent',
            distancia: 60,
        })

    }

    update(){
        this.draw()
        this.satelite.update();
        this.alvo.update();
    }
}

const imagemTerra = new Image();
imagemTerra.src = './src/img/terra.svg';

const planeta = new Terra({
    x: cnv.width/2, 
    y: cnv.height/2, 
    radius: 40, 
    img: imagemTerra, 
    rotacao: 5
});


