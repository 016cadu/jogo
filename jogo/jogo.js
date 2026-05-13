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

const chaves = {};
const tiro = [];
const inimigo = [];

let dificuldade = 1;

window.addEventListener("keydown", function(evento) {
    keys[evento.key] = true;
});

window.addEventListener("keyup", function(evento) {
  keys[evento.key] = false;
});

canvas.addEventListener("click", function() {
    tiro.push({
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
        math.PI * 2 
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