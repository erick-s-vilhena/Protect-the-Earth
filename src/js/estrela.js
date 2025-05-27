class Estrela{
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

function criarEstrelas(){
    for(let i = 1; i <= 200; i++){

        let posX = Math.random() * cnv.width;
        let posY = Math.random() * cnv.height;

        let tamanho = parseFloat((0.8 + Math.random() * 1.2).toFixed(2));

        let alpha = 0.2 + Math.random() * (1 - 0.2);

        fundo.push(new Estrela({
                            x: posX, 
                            y: posY, 
                            size: tamanho, 
                            alpha: alpha
                        }))
    }
}

function checkEstrelas(){
    fundo.forEach(estrela =>{
        estrela.update()
    })
}

