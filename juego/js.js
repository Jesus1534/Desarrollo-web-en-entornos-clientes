// Sound effects
const sounds = {
    pumpkin: new Audio(),
    ghost: new Audio(),
    powerup: new Audio(),
    hurt: new Audio()
};

// Try to load sound effects
try {
    sounds.pumpkin.src = 'https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3';
    sounds.ghost.src = 'https://assets.mixkit.co/active_storage/sfx/2205/2205-preview.mp3';
    sounds.powerup.src = 'https://assets.mixkit.co/active_storage/sfx/2578/2578-preview.mp3';
    sounds.hurt.src = 'https://assets.mixkit.co/active_storage/sfx/2955/2955-preview.mp3';
} catch(e) {
    console.log('Error loading sounds:', e);
}

// Create game elements
const gameContainer = document.getElementById('game-container');

// Create high score display
const highScoreElement = document.createElement('div');
highScoreElement.className = 'high-score-display';
highScoreElement.textContent = 'Récord: 0';
gameContainer.appendChild(highScoreElement);

// Create level display
const levelElement = document.createElement('div');
levelElement.className = 'level-display';
levelElement.textContent = 'Nivel: 1';
gameContainer.appendChild(levelElement);

// Create score display
const scoreElement = document.createElement('div');
scoreElement.className = 'score-display';
scoreElement.textContent = 'Puntos: 0';
gameContainer.appendChild(scoreElement);

// Create lives display
const livesElement = document.createElement('div');
livesElement.className = 'lives-display';
livesElement.textContent = 'Vidas: 3';
gameContainer.appendChild(livesElement);

// Create power-up display
const powerUpDisplay = document.createElement('div');
powerUpDisplay.className = 'power-up';
powerUpDisplay.style.display = 'none';
gameContainer.appendChild(powerUpDisplay);

// Create canvas
const canvas = document.createElement('canvas');
canvas.width = 800;
canvas.height = 600;
gameContainer.appendChild(canvas);
const ctx = canvas.getContext('2d');

// Create game over screen
const gameOverScreen = document.createElement('div');
gameOverScreen.className = 'game-over';
gameOverScreen.innerHTML = `
    <h1>¡Game Over!</h1>
    <p class="final-score">Puntuación final: 0</p>
    <button>Jugar de nuevo</button>
`;
gameContainer.appendChild(gameOverScreen);

const finalScoreElement = gameOverScreen.querySelector('.final-score');
const resetButton = gameOverScreen.querySelector('button');
resetButton.addEventListener('click', resetGame);

// Game variables
let score = 0;
let highScore = localStorage.getItem('highScore') || 0;
let lives = 3;
let level = 1;
let gameIsOver = false;
let gameStarted = false;
let powerUpActive = false;
let powerUpTimer = null;

// Player
const player = {
    x: canvas.width / 2,
    y: canvas.height - 50,
    width: 50,
    height: 50,
    speed: 5,
    color: '#FFA500'
};

// Arrays for falling objects
let pumpkins = [];
let ghosts = [];

// Object creation intervals
let pumpkinInterval = 2000; // Base interval for pumpkins
let ghostInterval = 3000;   // Base interval for ghosts
let powerUpInterval = 10000; // Power-up interval

// Power-ups array
let powerUps = [];

// Game objects
class FallingObject {
    constructor(type) {
        this.width = 40;
        this.height = 40;
        this.x = Math.random() * (canvas.width - this.width);
        this.y = -this.height;
        this.speed = (2 + Math.random() * 2) * (1 + (level - 1) * 0.1);
        this.type = type;
        this.rotation = 0;
        this.scale = 1;
    }

    draw() {
        ctx.save();
        ctx.translate(this.x + this.width/2, this.y + this.height/2);
        ctx.rotate(this.rotation);
        ctx.scale(this.scale, this.scale);
        
        if (this.type === 'pumpkin') {
            // Draw pumpkin
            ctx.beginPath();
            ctx.arc(0, 0, this.width/2, 0, Math.PI * 2);
            ctx.fillStyle = '#FFA500';
            ctx.fill();
            ctx.closePath();
            
            // Stem
            ctx.fillStyle = '#0C5000';
            ctx.fillRect(-5, -this.height/2, 10, 10);
        } else if (this.type === 'ghost') {
            // Draw ghost
            ctx.beginPath();
            ctx.arc(0, 0, this.width/2, Math.PI, 0, false);
            ctx.lineTo(this.width/2, this.height/2);
            ctx.lineTo(-this.width/2, this.height/2);
            ctx.closePath();
            ctx.fillStyle = '#FFFFFF';
            ctx.fill();
            
            // Eyes
            ctx.fillStyle = '#000000';
            ctx.beginPath();
            ctx.arc(-this.width/6, 0, 4, 0, Math.PI * 2);
            ctx.arc(this.width/6, 0, 4, 0, Math.PI * 2);
            ctx.fill();
        } else if (this.type === 'powerup') {
            // Draw power-up (star shape)
            ctx.beginPath();
            for (let i = 0; i < 5; i++) {
                ctx.lineTo(
                    Math.cos((i * 4 * Math.PI / 5) - Math.PI/2) * this.width/2,
                    Math.sin((i * 4 * Math.PI / 5) - Math.PI/2) * this.width/2
                );
                ctx.lineTo(
                    Math.cos((i * 4 * Math.PI / 5 + 2 * Math.PI/5) - Math.PI/2) * this.width/4,
                    Math.sin((i * 4 * Math.PI / 5 + 2 * Math.PI/5) - Math.PI/2) * this.width/4
                );
            }
            ctx.closePath();
            ctx.fillStyle = '#00FF00';
            ctx.fill();
        }
        ctx.restore();
    }

    update() {
        this.y += this.speed;
        this.rotation += 0.02;
        this.scale = 1 + Math.sin(Date.now() / 200) * 0.1;
    }
}

// Event listeners for player movement
let leftPressed = false;
let rightPressed = false;

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') leftPressed = true;
    if (e.key === 'ArrowRight') rightPressed = true;
});

document.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowLeft') leftPressed = false;
    if (e.key === 'ArrowRight') rightPressed = false;
});

// Game functions
function drawPlayer() {
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

function updatePlayer() {
    if (leftPressed && player.x > 0) player.x -= player.speed;
    if (rightPressed && player.x < canvas.width - player.width) player.x += player.speed;
}

function createObjects() {
    if (!gameIsOver) {
        setInterval(() => {
            pumpkins.push(new FallingObject('pumpkin'));
        }, pumpkinInterval);

        setInterval(() => {
            ghosts.push(new FallingObject('ghost'));
        }, ghostInterval);
    }
}

function checkCollision(object) {
    return player.x < object.x + object.width &&
           player.x + player.width > object.x &&
           player.y < object.y + object.height &&
           player.y + player.height > object.y;
}

function updateObjects() {
    // Update pumpkins
    for (let i = pumpkins.length - 1; i >= 0; i--) {
        pumpkins[i].update();
        if (checkCollision(pumpkins[i])) {
            score += 10;
            scoreElement.textContent = `Puntos: ${score}`;
            createParticles(pumpkins[i].x + pumpkins[i].width/2, 
                          pumpkins[i].y + pumpkins[i].height/2, 
                          '#FFA500', 
                          10);
            try {
                sounds.pumpkin.currentTime = 0;
                sounds.pumpkin.play();
            } catch(e) {
                console.log('Error playing sound:', e);
            }
            pumpkins.splice(i, 1);
        } else if (pumpkins[i].y > canvas.height) {
            pumpkins.splice(i, 1);
        }
    }

    // Update ghosts
    for (let i = ghosts.length - 1; i >= 0; i--) {
        ghosts[i].update();
        if (checkCollision(ghosts[i])) {
            lives--;
            livesElement.textContent = `Vidas: ${lives}`;
            createParticles(ghosts[i].x + ghosts[i].width/2, 
                          ghosts[i].y + ghosts[i].height/2, 
                          '#FFFFFF', 
                          15);
            try {
                sounds.hurt.currentTime = 0;
                sounds.hurt.play();
            } catch(e) {
                console.log('Error playing sound:', e);
            }
            ghosts.splice(i, 1);
            if (lives <= 0) {
                gameOver();
            } else {
                canvas.classList.add('hurt');
                setTimeout(() => canvas.classList.remove('hurt'), 500);
            }
        } else if (ghosts[i].y > canvas.height) {
            ghosts.splice(i, 1);
        }
    }

    // Update power-ups
    for (let i = powerUps.length - 1; i >= 0; i--) {
        powerUps[i].update();
        if (checkCollision(powerUps[i])) {
            activatePowerUp();
            createParticles(powerUps[i].x + powerUps[i].width/2, 
                          powerUps[i].y + powerUps[i].height/2, 
                          '#00FF00', 
                          20);
            powerUps.splice(i, 1);
        } else if (powerUps[i].y > canvas.height) {
            powerUps.splice(i, 1);
        }
    }
}

function gameOver() {
    gameIsOver = true;
    gameStarted = false;
    if (score > highScore) {
        highScore = score;
        localStorage.setItem('highScore', highScore);
        highScoreElement.textContent = `Récord: ${highScore}`;
    }
    gameOverScreen.style.display = 'block';
    finalScoreElement.textContent = `Puntuación final: ${score}`;
}

function resetGame() {
    score = 0;
    lives = 3;
    level = 1;
    gameIsOver = false;
    pumpkins = [];
    ghosts = [];
    powerUps = [];
    particles = [];
    powerUpActive = false;
    if (powerUpTimer) clearTimeout(powerUpTimer);
    player.speed = 5;
    player.x = canvas.width / 2;
    
    scoreElement.textContent = `Puntos: ${score}`;
    livesElement.textContent = `Vidas: ${lives}`;
    levelElement.textContent = `Nivel: ${level}`;
    powerUpDisplay.style.display = 'none';
    gameOverScreen.style.display = 'none';
    
    pumpkinInterval = 2000;
    ghostInterval = 3000;
}

// Particle system
class Particle {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.velocity = {
            x: (Math.random() - 0.5) * 5,
            y: (Math.random() - 0.5) * 5
        };
        this.alpha = 1;
        this.size = Math.random() * 5 + 2;
    }

    draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }

    update() {
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.alpha -= 0.02;
    }
}

let particles = [];

function createParticles(x, y, color, amount) {
    for (let i = 0; i < amount; i++) {
        particles.push(new Particle(x, y, color));
    }
}

function updateParticles() {
    for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        particles[i].draw();
        if (particles[i].alpha <= 0) {
            particles.splice(i, 1);
        }
    }
}

// Power-up functions
function createPowerUp() {
    if (!gameIsOver && gameStarted) {
        powerUps.push(new FallingObject('powerup'));
    }
}

function activatePowerUp() {
    powerUpActive = true;
    powerUpDisplay.style.display = 'block';
    powerUpDisplay.textContent = '¡Super Velocidad!';
    player.speed = 10;

    if (powerUpTimer) clearTimeout(powerUpTimer);
    powerUpTimer = setTimeout(() => {
        powerUpActive = false;
        player.speed = 5;
        powerUpDisplay.style.display = 'none';
    }, 5000);
}

// Level system
function updateLevel() {
    if (score > level * 100) {
        level++;
        levelElement.textContent = `Nivel: ${level}`;
        
        // Ajustar intervalos de aparición
        pumpkinInterval = Math.max(400, 2000 - (level - 1) * 200);
        ghostInterval = Math.max(800, 3000 - (level - 1) * 200);
        
        // Mostrar mensaje de nivel
        const levelUpMessage = document.createElement('div');
        levelUpMessage.className = 'level-up-message';
        levelUpMessage.textContent = `¡Nivel ${level}!`;
        gameContainer.appendChild(levelUpMessage);
        
        // Efecto de partículas para nuevo nivel
        for (let i = 0; i < 30; i++) {
            createParticles(
                Math.random() * canvas.width,
                Math.random() * canvas.height,
                ['#FFA500', '#FFD700', '#FF4500'][Math.floor(Math.random() * 3)],
                5
            );
        }
        
        // Eliminar el mensaje después de un momento
        setTimeout(() => {
            levelUpMessage.remove();
        }, 2000);
    }
}

// Start screen
function createStartScreen() {
    const startScreen = document.createElement('div');
    startScreen.className = 'start-screen';
    startScreen.innerHTML = `
        <h1>Calabazas y Fantasmas</h1>
        <p>Nivel actual: ${level}</p>
        <p>Record: ${highScore}</p>
        <button id="startButton">¡Jugar!</button>
    `;
    gameContainer.appendChild(startScreen);

    document.getElementById('startButton').addEventListener('click', () => {
        gameStarted = true;
        startScreen.remove();
        startGame();
    });
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    if (!gameIsOver && gameStarted) {
        updateLevel();
        updatePlayer();
        updateObjects();
        updateParticles();
        
        drawPlayer();
        pumpkins.forEach(pumpkin => pumpkin.draw());
        ghosts.forEach(ghost => ghost.draw());
        powerUps.forEach(powerUp => powerUp.draw());
    }
    
    requestAnimationFrame(gameLoop);
}

function createMultiplePumpkins() {
    if (!gameIsOver && gameStarted) {
        // Número base de calabazas más bonus por nivel
        const numPumpkins = 1 + Math.floor(level / 3);
        
        // Crear grupo de calabazas
        for (let i = 0; i < numPumpkins; i++) {
            const pumpkin = new FallingObject('pumpkin');
            // Variar la posición X para que no aparezcan exactamente en el mismo lugar
            pumpkin.x = Math.max(0, Math.min(canvas.width - pumpkin.width,
                pumpkin.x + (Math.random() - 0.5) * 200));
            // Variar ligeramente la velocidad de cada calabaza
            pumpkin.speed *= 0.8 + Math.random() * 0.4;
            pumpkins.push(pumpkin);
        }
    }
}

function startGame() {
    // Start object creation intervals
    setInterval(createMultiplePumpkins, pumpkinInterval);

    setInterval(() => {
        if (!gameIsOver && gameStarted) {
            ghosts.push(new FallingObject('ghost'));
        }
    }, ghostInterval);

    setInterval(createPowerUp, powerUpInterval);
    
    // Start the game loop
    gameLoop();
}

// Initialize the game
createStartScreen();
gameLoop();
