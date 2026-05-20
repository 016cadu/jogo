const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const imagemFundo = new Image();
imagemFundo.src = "floflobiuta.jpg";

const imagemJogador = new Image();
imagemJogador.src = "vinijr.png";

const imagemInimigo = new Image();
imagemInimigo.src = "virginia.png";

const imagemTiro = new Image();
imagemTiro.src = "tintabranca.png";

canvas.width = 1000;
canvas.height = 600;

const jogador = {
    x: 500,
    y: 300,
    raio: 30,
    cor: "white",
    velocidade: 5,
};

const teclas = {};
const tiros = [];
const inimigos = [];

let dificuldade = 1;
let pontos = 0;

window.addEventListener("keydown", function(evento) {
    teclas[evento.key] = true;
});

window.addEventListener("keyup", function(evento) {
  teclas[evento.key] = false;
});

canvas.addEventListener("click", function() {
    tiros.push({
        x: jogador.x,
        y: jogador.y,
        raio: 15
    });
});

function desenharJogador() {
    ctx.drawImage(
        imagemJogador,

        jogador.x - jogador.raio,
        jogador.y - jogador.raio,

        jogador.raio * 2,
        jogador.raio * 2
    );
}


function moverJogador() {
    
    if (teclas["w"]) {
        jogador.y -= jogador.velocidade;
    }

    if (teclas["s"]) {
        jogador.y += jogador.velocidade;
    }

    if (teclas["a"]) {
        jogador.x -= jogador.velocidade;
    }

        if (teclas["d"]) {
        jogador.x += jogador.velocidade;    
    }

    jogador.x = Math.max(
        jogador.raio,
        Math.min(
            canvas.width - jogador.raio,
            jogador.x
        )
    );

    jogador.y = Math.max(
        jogador.raio,
        Math.min(
            canvas.height - jogador.raio,
            jogador.y
        )
    );
}

function atualizarTiros() {
    for (let i = tiros.length - 1; i >= 0; i--) {

        const tiro = tiros[i];

        tiro.x += 10

        ctx.drawImage(
            imagemTiro,

            tiro.x - tiro.raio,
            tiro.y - tiro.raio,

            tiro.raio * 2,
            tiro.raio * 2
        );

        if (tiro.x > canvas.width) {
            tiros.splice(i, 1);
        }
    }
}


function criarInimigo() {
    const inimigo = {
        x: canvas.width + 20,
        y: Math.random() * canvas.height,
        raio: 25,
        cor: "lime",
        velocidade: 2 + dificuldade
    };
    
    inimigos.push(inimigo);
}

setInterval(criarInimigo, 1000);

setInterval(function() {
    dificuldade += 0.2;
}, 5000);

function atualizarInimigos() {
    for (let i = inimigos.length - 1; i >= 0; i--) {
        const inimigo = inimigos[i];
        inimigo.x -= inimigo.velocidade;

        ctx.drawImage(
            imagemInimigo,

            inimigo.x - inimigo.raio,
            inimigo.y - inimigo.raio,

            inimigo.raio * 2,
            inimigo.raio * 2
        );

        if (inimigo.x < -50) {
            inimigos.splice(i, 1);
        }
    }
}

function verificarColisoes() {
for (let i = inimigos.length - 1; i >= 0; i--) {
        const inimigo = inimigos[i];

        for (let j = tiros.length - 1; j >= 0; j--) {
            const tiro = tiros[j];
            const dx = inimigo.x - tiro.x;
            const dy = inimigo.y - tiro.y;
            const distancia = Math.sqrt(
                dx * dx + dy * dy
            );

            if (
                distancia <
                inimigo.raio + tiro.raio
            ) {
                inimigos.splice(i, 1);
                tiros.splice(j, 1);
                pontos++;
                break;
            }
        }

        const dx = inimigo.x - jogador.x;
        const dy = inimigo.y - jogador.y;
        const distancia = Math.sqrt(
            dx * dx + dy * dy
        );

        if (
            distancia <
            inimigo.raio + jogador.raio
        ) {
            alert("GAME OVER! Pressione ESC para reiniciar.");
            location.reload();
        }
    }
}

function desenharPontos() {
    ctx.fillStyle = "black";
    ctx.font = "30px Arial";
    ctx.fillText(
        "Pontos: " + pontos,
        20,
        40
    );
}

function loopJogo() {
    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    ctx.drawImage(
     imagemFundo,
     0,
     0,
     canvas.width,
     canvas.height
    );

    moverJogador();
    desenharJogador();
    atualizarTiros();
    atualizarInimigos();
    verificarColisoes();
    desenharPontos();
    requestAnimationFrame(loopJogo);
}

loopJogo();
