class Jogador extends Sprite{
    constructor(options = {}){
        super(options)

        this.velocidadeRotacao = 0.05
        this.velocidadeMovimento = 4
        this.angulo = 0

        this.morreu = false

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

        if(Math.abs(this.angulo) <= Math.PI*2){
            this.angulo += this.rotacao * 0.001
        }else{
            this.angulo = 0
        }
    }

    update(){
        if(!this.morreu){
            this.draw()
        }else{

            this.x = planeta.x
            this.y = planeta.y - planeta.radius - 20
            this.angulo = 0

            setTimeout(() => {
                this.morreu = false
            }, 3000);
          
        }

        if (tecla_D_Pressionada) {
                this.angulo += this.velocidadeRotacao;
        }

        if (tecla_A_Pressionada) {
                this.angulo -= this.velocidadeRotacao;
        }

        if (tecla_W_Pressionada &&
            this.x + this.radius >= -this.radius &&
            this.x + this.radius <= cnv.width + this.radius &&

            this.y + this.radius >= -this.radius &&
            this.y + this.radius <= cnv.height + this.radius
        ){
            // Calcula a direção do radome (ângulo atual)
            const direcaoX = Math.sin(this.angulo);
            const direcaoY = -Math.cos(this.angulo);

            // Move a nave
            this.x += direcaoX * this.velocidadeMovimento;
            this.y += direcaoY * this.velocidadeMovimento;
            }

        else if(this.x + this.radius < -this.radius){
            this.x = cnv.width
        }
        else if(this.x + this.radius > cnv.width + this.radius){
            this.x = 0
        }

        else if(this.y + this.radius < -this.radius){
            this.y = cnv.height
        }
        else if(this.y + this.radius > cnv.height + this.radius){
            this.y = 0
        }

        // Calcula a direção do radome (ângulo atual)
        const direcaoX = Math.sin(this.angulo);
        const direcaoY = -Math.cos(this.angulo);

        // Move a nave
        this.x += direcaoX * 1;
        this.y += direcaoY * 1;   
    }
}

const imagemNave = new Image();
imagemNave.src = './src/img/nave.svg';

let posXY = 0;

const jogador = new Jogador({
    x: planeta.x,
    y: planeta.y - planeta.radius - 20,
    radius: 10,
    img: imagemNave,
    //color: 'red'
})

window.addEventListener('keydown', (e) => {
    if (e.code === 'KeyW') tecla_W_Pressionada = true;
    if (e.code === 'KeyD') tecla_D_Pressionada = true;
    if (e.code === 'KeyA') tecla_A_Pressionada = true;
    
})

window.addEventListener('keyup', (e) => {
    if (e.code === 'KeyW') tecla_W_Pressionada = false;
    if (e.code === 'KeyD') tecla_D_Pressionada = false;
    if (e.code === 'KeyA') tecla_A_Pressionada = false;
})


btnAcelerar.addEventListener('touchstart', ()=>{
    tecla_W_Pressionada = true;
})

btnAcelerar.addEventListener('touchend', ()=>{
    tecla_W_Pressionada = false;
})



btnDireita.addEventListener('touchstart', ()=>{
    tecla_D_Pressionada = true;
})

btnDireita.addEventListener('touchend', ()=>{
    tecla_D_Pressionada = false;
})



btnEsquerda.addEventListener('touchstart', ()=>{
    tecla_A_Pressionada = true;
})

btnEsquerda.addEventListener('touchend', ()=>{
    tecla_A_Pressionada = false;
})