const canvas = document.getElementById("jogoCanvas");
const ctx = canvas.getContext("2d");

canvas.widht = 1000;
canvas.height = 600;

const player = {
    x: 500,
    y: 300,
    raio: 20,
    color: "green",
    speed: 5,
    dirX: 1,
    dirY: 0
};

const keys = {};
const tiros = [];
const inimigos = [];

let dificuldade = 1;

window.addEventListener("keydown", function(evento) {
    keys[evento.key] = true;
});

window.addEventListener("keyup", function(evento) {
  keys[evento.key] = false;
});

canvas.addEventListener("click", function() {
    tiros.push({
        x: player.x,
        y: player.y,
        raio: 5,
        velocityX: player.dirX * 10,
        velocityY: player.dirY * 10

    });
});

function drawPlayer() {
    ctx.beginPath();
    ctx.arc(
        player.x,
        player.y,
        player.raio,
        0,
        Math.PI * 2 
    );

    ctx.fillStyle = player.color;
    ctx.fill();
}


function movePlayer() {
    
    if (keys["w"]) {
        player.y -= player.speed;
        player.dirX = 0;
        player.dirY = -1;
    }

    if (keys["s"]) {
        player.y -= player.speed;
        player.dirX = 0;
        player.dirY = 1;
    }

    if (keys["a"]) {
        player.y -= player.speed;
        player.dirX = -1;
        player.dirY = 0;
    }

        if (keys["d"]) {
        player.y -= player.speed;
        player.dirX = 1;
        player.dirY = 0;
    }

    player.x = Math.max(
        player.raio,
        Math.min(
            canvas.widht - player.raio,
            player.x
        )
    );

    player.y = Math.max(
        player.raio,
        Math.min(
            canvas.height - player.raio,
            player.y
        )
    );
}

function updateTiros() {
    tiros.forEach(function(tiro, index) {
        tiro.x += tiro.velocityX;
        tiro.y += tiro.velocityY;

        ctx.beginPath();
        ctx.arc(
            tiro.x,
            tiro.y,
            tiro.raio,
            0,
            Math.PI * 2
        );

        ctx.fillStyle = "yellow";
        ctx.fill();

        if(
            tiro.x < 0 ||
            tiro.x > canvas.widht ||
            tiro.y < 0 ||
            tiro.y > canvas.height
        ) {
            tiros.splice(index, 1);
        }
    });

}

function spawnInimigo() {
    const inimigo = {
        x: canvas.widht + 20,
        y: Math.random() * canvas.height,
        raio: 15,
        color: "blue",
        speed: 2 + dificuldade
    };
    
    inimigos.push(inimigo);
}

setInterval(spawnInimigo, 1000);

setInterval(function() {
    dificuldade += 0.2;
}, 5000);

function updateInimigos() {
    inimigos.forEach(function(inimigo, index) {
        inimigo.x -= inimigo.speed;
        ctx.beginPath();
        ctx.arc(
            inimigo.x,
            inimigo.y,
            inimigo.raio,
            0,
            Math.PI * 2
        );

        ctx.fillStyle = inimigo.color;
        ctx.fill();
        if (inimigo.x < -50) {
            inimigos.splice(index, 1);
        }
    });
}

function checkColisao() {
    inimigos.forEach(function(inimigo, inimigoIndex) {
        tiros.forEach(function(tiro, tiroIndex) {
            const dx = inimigo.x - tiro.x;
            const dy = inimigo.y - tiro.y;
            const distance = Math.sqrt(
                dx * dx + dy * dy
            );

            if (
                distance <
                inimigo.raio + tiro.raio
            ) {
                inimigos.splice(enemyIndex, 1);
                tiros.splice(tiroIndex, 1);
            }
        });
        
        const dx = inimigo.x - player.x;
        const dy = inimigo.y - player.y;
        const distance = Math.sqrt(
            dx * dx + dy * dy
        );

        if (
            distance <
            inimigo.raio + player.raio
        ) {
            alert("GAME OVER! F5 para reiniciar.");
            location.reload();
        }
    });
}

function gameLoop() {
    ctx.clearRect(
        0,
        0,
        canvas.widht,
        canvas.height
    );

    movePlayer();
    drawPlayer();
    updateTiros();
    updateInimigos();
    checkColisao();
    requestAnimationFrame(gameLoop);
}

gameLoop();