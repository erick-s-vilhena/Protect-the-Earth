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

        criarProjetil();
    }
})

cnv.addEventListener('click', (e) => {
    e.preventDefault()
    
    criarProjetil();
})

btnNewGame.addEventListener('click', novoJogo)

btnInciarJogo.addEventListener('click', novoJogo)

function loop(){
    animateID = requestAnimationFrame(loop, cnv);

    update();
}

function update(){
    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.fillRect(0, 0, cnv.width, cnv.height)

    checkEstrelas()
    checkMeteoros()
    checkProjetil()
    checkParticulas()

    planeta.update();
    jogador.update();
}

function fimJogo(){

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

    text_score.innerText = `PONTUAÇÃO: ${score}`

    loop();

    criarMeteoros();

    ctx.fillStyle = '#fff'
    ctx.fillRect(0, 0, cnv.width, cnv.height)

    text_score.style.opacity = 1
}

function limparTela(){

    ctx.fillStyle = 'rgba(0, 0, 0, 1)';
    ctx.fillRect(0, 0, cnv.width, cnv.height)

    criarEstrelas();
    checkEstrelas();
}

limparTela();
