window.addEventListener('resize', () => {
  location.reload();
});

window.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        e.preventDefault()

        if(gameOverModal.style.opacity == 1){
            novoJogo() 
        }

        if(startModal.style.opacity == 1){
            novoJogo()
        } 
    }
})

btnNewGame.addEventListener('click', novoJogo)

btnInciarJogo.addEventListener('click', novoJogo)

function loop(){
    animateID = requestAnimationFrame(loop, cnv);

    update();
}

function update(){
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(0, 0, cnv.width, cnv.height)

    checkEstrelas()

    planeta.update();
    satelite.update();
    alvo.update();
    jogador.update();
    radome.update();

    checkMeteoros()
    checkProjetil()
    checkParticulas()
    checkSatelite()

    criarMeteoros();

    aumentarDificultade();
}

function fimJogo(){
    anti_bug_press_inciar_jogo = false;

    musicGame.pause()
    musicGame.currentTime = 0

    cancelAnimationFrame(animateID)

    clearInterval(intervalID)

    gameOverScore.innerText = score
    
    gameOverModal.style.display = 'flex'

    text_score.style.opacity = 0

    setTimeout(()=>{
        gameOverModal.style.opacity = 1
    }, 500)
}

function novoJogo(){
    if(!anti_bug_press_inciar_jogo){
        anti_bug_press_inciar_jogo = true;

        musicGame.play()

        startModal.style.opacity = 0
    
        setTimeout(()=>{
            startModal.style.display = 'none'
        }, 500)

        gameOverModal.style.opacity = 0
        
        setTimeout(()=>{
            gameOverModal.style.display = 'none'
        }, 500)

        projectiles = []
        enemies = []
        particles = []

        score = 0

        barraDeVida.style.width = '100%'

        text_score.innerText = `PONTUAÇÃO: ${score}`

        tempoCriarMeteoro = 180;

        loop();

        criarMeteoros();

        ctx.fillStyle = '#fff'
        ctx.fillRect(0, 0, cnv.width, cnv.height)

        text_score.style.opacity = 1
    }
}

function playSons(soundType){
    const som = document.createElement('audio')
    
    if(soundType === explosao){
        som.src = "./src/sounds/explosion.ogg"
    }
    else{
        som.src = "./src/sounds/shooting.mp3"
    }

    som.addEventListener('canplaythrough', ()=>{
        som.play()
    })
}

function limparTela(){

    ctx.fillStyle = 'rgba(0, 0, 0, 1)';
    ctx.fillRect(0, 0, cnv.width, cnv.height)

    criarEstrelas();
    checkEstrelas();
}

function aumentarDificultade(){
    if(score > dificultade && tempoCriarMeteoro > 60){
        tempoCriarMeteoro -= 10

        dificultade += 1000
    }

    //console.log(dificultade + ' ' + tempoCriarMeteoro)
}

limparTela();
