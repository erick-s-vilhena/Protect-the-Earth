class Radome extends Esfera{
    constructor(options = {}){
        super(options)

    }

    draw(){
        ctx.save();

        ctx.translate(this.player.x, this.player.y);
        ctx.rotate(this.player .angulo);

        ctx.beginPath();
        ctx.arc(0, -jogador.radius + this.radius, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;

        ctx.fill();
        ctx.closePath();

        // Restaura o estado do canvas (remove rotação/translação)
        ctx.restore();
    }

    update(){
        this.draw()
    }
}

const radome = new Radome({
    x: jogador.x,
    y: jogador.y - jogador.radius + 20,  // Borda superior
    radius: 1,
    color: 'transparent',
    player: jogador
})