class Planeta extends Sprite{
    constructor(options = {}){
        super(options)


    }

    update(){
        this.draw()
    }
}

const imagemTerra = new Image();
imagemTerra.src = './src/img/terra.svg';

const planeta = new Planeta({
    x: cnv.width/2, 
    y: cnv.height/2, 
    radius: cnv.width > 600 ? 40 : 30, 
    img: imagemTerra, 
    rotacao: 5
});


