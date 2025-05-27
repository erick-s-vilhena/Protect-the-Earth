const shootingSpeed = 4

let projectiles = [];
let enemies = [];
let particles = [];
let fundo = [];
let intervalID;

window.addEventListener('resize', () => {
  location.reload();
});

window.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        e.preventDefault()

        criarProjetil();
    }
})

cnv.addEventListener('click', (e) => {
    e.preventDefault()
    
    criarProjetil();
})


function loop(){
    requestAnimationFrame(loop, cnv);

    update();
}

function update(){
    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.fillRect(0, 0, cnv.width, cnv.height)

    checkEstrelas()
    checkMeteoros()
    checkProjetil()
    checkParticulas()

    player.update()
}

loop();
criarMeteoros();
criarEstrelas();
