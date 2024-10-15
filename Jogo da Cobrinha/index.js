const canvas = document.getElementById('MyCanvas');
const ctx = canvas.getContext('2d');

const boxSize = 20;
let snake = [{ x: 10 * boxSize, y: 10 * boxSize }];
let direction = 'RIGHT';
let food = {
    x: Math.floor(Math.random() * (canvas.width / boxSize)) * boxSize,
    y: Math.floor(Math.random() * (canvas.height / boxSize)) * boxSize
};
let score = 0;

// Controle da direção com as setas do teclado
document.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft' && direction !== 'RIGHT') direction = 'LEFT';
    else if (event.key === 'ArrowUp' && direction !== 'DOWN') direction = 'UP';
    else if (event.key === 'ArrowRight' && direction !== 'LEFT') direction = 'RIGHT';
    else if (event.key === 'ArrowDown' && direction !== 'UP') direction = 'DOWN';
});

// Função para desenhar a cobra
function drawSnake() {
    snake.forEach(part => {
        ctx.fillStyle = 'green';
        ctx.fillRect(part.x, part.y, boxSize, boxSize);
        ctx.strokeStyle = 'darkgreen';
        ctx.strokeRect(part.x, part.y, boxSize, boxSize);
    });
}

// Função para desenhar a comida
function drawFood() {
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, boxSize, boxSize);
}

// Função para atualizar a posição da cobra
function updateSnake() {
    const head = { x: snake[0].x, y: snake[0].y };

    // Atualiza a posição da cabeça da cobra
    if (direction === 'LEFT') head.x -= boxSize;
    if (direction === 'UP') head.y -= boxSize;
    if (direction === 'RIGHT') head.x += boxSize;
    if (direction === 'DOWN') head.y += boxSize;

    // Verifica se a cobra comeu a comida
    if (head.x === food.x && head.y === food.y) {
        score++;
        food = {
            x: Math.floor(Math.random() * (canvas.width / boxSize)) * boxSize,
            y: Math.floor(Math.random() * (canvas.height / boxSize)) * boxSize
        };
    } else {
        snake.pop(); // Remove a última parte da cobra se não comer
    }

    // Adiciona a nova posição da cabeça da cobra
    snake.unshift(head);
}

// Função para verificar colisões
function checkCollision() {
    const head = snake[0];

    // Verifica se a cobra colidiu com as paredes
    if (
        head.x < 0 || head.x >= canvas.width ||
        head.y < 0 || head.y >= canvas.height
    ) {
        return true;
    }

    // Verifica se a cobra colidiu consigo mesma
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            return true;
        }
    }

    return false;
}

// Função principal do jogo
function game() {
    if (checkCollision()) {
        alert('Game Over! Pontuação: ' + score);
        snake = [{ x: 10 * boxSize, y: 10 * boxSize }];
        direction = 'RIGHT';
        score = 0;
        food = {
            x: Math.floor(Math.random() * (canvas.width / boxSize)) * boxSize,
            y: Math.floor(Math.random() * (canvas.height / boxSize)) * boxSize
        };
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawFood();
    updateSnake();
    drawSnake();
}

// Ajuste a velocidade do jogo
setInterval(game, 80);
