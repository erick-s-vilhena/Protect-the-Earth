class Projetil extends Esfera{
    constructor(options = {}){
        super(options)

        this.velocity = options.velocity || {x: 0, y: 0}
    }
    
    update(){
        this.draw()

        this.x += this.velocity.x
        this.y += this.velocity.y
    }
}

function criarProjetil(){
    const angle = Math.atan2(-(planeta.y - planeta.satelite.y), -(planeta.x - planeta.satelite.x))

    const velocity = {
        x: Math.cos(angle) * shootingSpeed,
        y: Math.sin(angle) * shootingSpeed
    }

    projectiles.push(new Projetil({
                                x: planeta.satelite.x, 
                                y: planeta.satelite.y, 
                                radius: 2,
                                velocity: velocity
                            })) 

    planeta.satelite.angleUpdateValue = -planeta.satelite.angleUpdateValue
}

function checkProjetil(){
    for(let i = projectiles.length - 1; i >= 0; i--){
        const pro = projectiles[i]
        pro.update()

        checkProjetilForaDaTela(pro, i);

        for(let e = enemies.length - 1; e >= 0; e--){
            const enemy = enemies[e];

            const distance = Math.hypot(pro.x - enemy.x, pro.y - enemy.y)

            //colisão projetil -> inimigo
            if(distance < pro.radius + enemy.radius){
                if(enemy.radius > 15){
                    enemy.newRadius = enemy.radius - 10
                }else{
                    enemies.splice(e, 1)
                }
               // enemies.splice(e, 1)

               score += 50 - Math.floor(enemy.radius)

               text_score.innerText = `PONTUAÇÃO: ${score}`
                
                projectiles.splice(i, 1)

                criarParticulas(enemy, pro)
            }
        }
    }
}

function checkProjetilForaDaTela(projectile, index){
    if(projectile.x + projectile.radius < 0 ||
        projectile.x - projectile.radius > cnv.width ||
        projectile.y + projectile.radius < 0 ||
        projectile.y - projectile.radius > cnv.height
    ){
        projectiles.splice(index, 1)
        //console.log(projectiles.length)
    }
}
