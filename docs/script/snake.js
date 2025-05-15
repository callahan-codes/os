import * as API from './api.js';

let snake;
let snakeDirection;
let food;
let gameOver;
let gridSize;
let canvasSizeX;
let canvasSizeY;
let score = 0;
let ctx;
let gameInterval;
let scoreboard;
let touchStartX = 0;
let touchStartY = 0;

export function initializeGame() {
    const canvas = document.getElementById("gameCanvas");
    ctx = canvas.getContext("2d");

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    canvasSizeX = canvas.width;
    canvasSizeY = canvas.height;

    gridSize = Math.floor(canvas.width / 40);

    snake = [{x: Math.floor(canvasSizeX / 2 / gridSize) * gridSize, y: Math.floor(canvasSizeY / 2 / gridSize) * gridSize}];
    snakeDirection = 'RIGHT';
    food = generateFood();
    gameOver = false;

    gameInterval = setInterval(gameLoop, 100);

    document.addEventListener("keydown", changeDirection);
    canvas.addEventListener("touchstart", touchStartHandler);
    canvas.addEventListener("touchend", touchEndHandler);
}

export function updateGameCanvasSize(newWidth, newHeight) {
    const canvas = document.getElementById("gameCanvas");
    canvas.width = newWidth;
    canvas.height = newHeight;
    canvasSizeX = newWidth;
    canvasSizeY = newHeight;

    gridSize = Math.floor(canvas.width / 25);

    snake = [{x: Math.floor(canvasSizeX / 2 / gridSize) * gridSize, y: Math.floor(canvasSizeY / 2 / gridSize) * gridSize}];
    food = generateFood();
}

function gameLoop() {
    if (gameOver) {
        let topTenScore = false;
        clearInterval(gameInterval);

        scoreboard.forEach(userScore => {
            if(score >= userScore.userScore) {
                topTenScore = true;
            }
        });

        if(topTenScore) {
            addNewLeaderScore();
        } else {
            restartGame();
        }
        return;
    }

    moveSnake();
    checkCollision();
    checkFoodCollision();
    clearCanvas();
    drawSnake();
    drawFood();
}

async function setLeaderboard() {
    scoreboard = await API.getSnakeLeaderboard();
}

function touchStartHandler(event) {
    event.preventDefault();

    const touch = event.touches[0];
    touchStartX = touch.clientX;
    touchStartY = touch.clientY;
}

function touchEndHandler(event) {
    event.preventDefault();

    const touch = event.changedTouches[0];
    const touchEndX = touch.clientX;
    const touchEndY = touch.clientY;

    const deltaX = touchEndX - touchStartX;
    const deltaY = touchEndY - touchStartY;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {

        if (deltaX > 0 && snakeDirection !== 'LEFT') {
            snakeDirection = 'RIGHT';
        } else if (deltaX < 0 && snakeDirection !== 'RIGHT') {
            snakeDirection = 'LEFT';
        }

    } else {

        if (deltaY > 0 && snakeDirection !== 'UP') {
            snakeDirection = 'DOWN';
        } else if (deltaY < 0 && snakeDirection !== 'DOWN') {
            snakeDirection = 'UP';
        }

    }
}

function changeDirection(event) {
    if (event.key === 'ArrowUp' && snakeDirection !== 'DOWN') {
        snakeDirection = 'UP';
    } else if (event.key === 'ArrowDown' && snakeDirection !== 'UP') {
        snakeDirection = 'DOWN';
    } else if (event.key === 'ArrowLeft' && snakeDirection !== 'RIGHT') {
        snakeDirection = 'LEFT';
    } else if (event.key === 'ArrowRight' && snakeDirection !== 'LEFT') {
        snakeDirection = 'RIGHT';
    }
}

function moveSnake() {
    const head = {...snake[0]};

    if (snakeDirection === 'UP') {
        head.y -= gridSize;
    } else if (snakeDirection === 'DOWN') {
        head.y += gridSize;
    } else if (snakeDirection === 'LEFT') {
        head.x -= gridSize;
    } else if (snakeDirection === 'RIGHT') {
        head.x += gridSize;
    }

    if (head.x < 0 || head.x >= canvasSizeX || head.y < 0 || head.y >= canvasSizeY) {
        gameOver = true; 
        return; 
    }

    head.x = Math.floor(head.x / gridSize) * gridSize;
    head.y = Math.floor(head.y / gridSize) * gridSize;

    snake.unshift(head);
    snake.pop();
}

function checkCollision() {
    const head = snake[0];

    if (head.x < 0 || head.x >= canvasSizeX || head.y < 0 || head.y >= canvasSizeY) {
        gameOver = true; 
        return; 
    }

    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            gameOver = true;
        }
    }
}

function checkFoodCollision() {
    const head = snake[0];

    if (head.x === food.x && head.y === food.y) {
        snake.push({x: food.x, y: food.y});
        score += 10;
        food = generateFood();
    }
}

function generateFood() {
    const x = Math.floor(Math.random() * (canvasSizeX / gridSize)) * gridSize;
    const y = Math.floor(Math.random() * (canvasSizeY / gridSize)) * gridSize;
    return {x, y};
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvasSizeX, canvasSizeY);
}

function drawSnake() {
    snake.forEach((segment, index) => {
        ctx.fillStyle = index === 0 ? 'white' : 'gray';
        ctx.fillRect(segment.x, segment.y, gridSize, gridSize);
    });
}

function drawFood() {
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, gridSize, gridSize);
}

async function restartGame() {
    clearInterval(gameInterval);
    showMenuScreen();
    score = 0;
}

export function destroyGame() {
    gameOver = true;
}

export async function showMenuScreen() {
    const existingScreen = document.getElementById('snake-menu_screen');
    if (existingScreen) {
        existingScreen.remove();
    }

    setLeaderboard();
    const appScreen = document.getElementById('snake-container');

    const html = `
        <div class="snake-menu_screen" id="snake-menu_screen">
            <div id="snake-con">
                <h1>SNAKE.io</h1>
                <div class="grid col-2">
                    <div id="snake-menu-btn">Play</div>
                    <div id="snake-leaderboard-btn">Leaderboard</div>
                </div>
                <div id="snake-score-container">
                    <p id="score">Score: ${score}</p>
                </div>
                <p id="timer"></p>
            </div>
        </div>
    `;

    const menuDiv = document.createElement('div');
    menuDiv.innerHTML = html;

    const appElement = menuDiv.firstElementChild;
    appScreen.appendChild(appElement);

    document.getElementById('snake-menu-btn').addEventListener('click', () => {
        const timer = document.getElementById("timer");
        const menuBtn = document.getElementById('snake-menu-btn');
        const leaderboardBtn = document.getElementById('snake-leaderboard-btn');

        var time = 3;
        setInterval(() => {
            menuBtn.classList.add('hide');
            leaderboardBtn.classList.add('hide');
            timer.innerHTML = `Starting in ${time}`;
            if (time === 0) {
                document.getElementById('snake-menu_screen').remove();
                initializeGame();
            }
            time--;
        }, 1000);
    });

    document.getElementById('snake-leaderboard-btn').addEventListener('click', () => {
        document.getElementById('snake-menu_screen').remove();
        showLeaderboard();
    });
}

async function addNewLeaderScore() {

    const existingScreen = document.getElementById('snake-menu_screen');
    if (existingScreen) {
        existingScreen.remove();
    }

    const appScreen = document.getElementById('snake-container');
    const html = `
        <div class="snake-menu_screen" id="snake-menu_screen">
            <div id="snake-con">
                <h1>SNAKE.io</h1>
                <h3>New Top 10 Score!</h3>
                <form onsubmit="return false;" method="post" id="snake-score-form">
                    <label for="snake-user-name">Username</label><br>
                    <input type="text" id="snake-user-name" name="snake-user-name" placeholder="XXXXX"><br>
                    <button class="btn-light" type="submit" id="snake-score-submitBtn">Enter</button>
                </form> 
            </div>
        </div>
    `;

    const menuDiv = document.createElement('div');
    menuDiv.innerHTML = html;

    const appElement = menuDiv.firstElementChild;
    appScreen.appendChild(appElement);

    document.getElementById('snake-score-submitBtn').addEventListener('click', async () => {
        const username = document.getElementById('snake-user-name').value;
        if (!username) {
            alert("Invalid name");
        } else {

            await API.createNewSnakeScore(score, username);

            let newScore = {
                userName: username,
                userScore: score
            };

            scoreboard.push(newScore);

            await setLeaderboard(); 
            showLeaderboard(); 

            document.getElementById('snake-menu_screen').remove();
            restartGame();
        }
    });
}

async function showLeaderboard() {

    const existingScreen = document.getElementById('snake-menu_screen');
    if (existingScreen) {
        existingScreen.remove();
    }

    const appScreen = document.getElementById('snake-container');

    let topFiveScores = scoreboard.slice(0, 5);
    let lastFiveScores = scoreboard.slice(5, 10);

    let html = `
        <div class="snake-menu_screen" id="snake-menu_screen">
            <div id="snake-con">
                <h1>SNAKE.io</h1>
                <h3>Leaderboard</h3>
                <div class="grid col-2">
                    <!-- Left Column (1-5) -->
                    <div class="leaderboard-column">
                        ${topFiveScores.map((score, index) => {
                            return `${index + 1}. ${score.userName} | ${score.userScore}<br>`;
                        }).join('')}
                    </div>
                    
                    <!-- Right Column (6-10) -->
                    <div class="leaderboard-column">
                        ${lastFiveScores.map((score, index) => {
                            return `${index + 6}. ${score.userName} | ${score.userScore}<br>`;
                        }).join('')}
                    </div>
                </div>
                <div id="leaderboard-back-btn">Back</div>
            </div>
        </div>
    `;

    const menuDiv = document.createElement('div');
    menuDiv.innerHTML = html;

    const appElement = menuDiv.firstElementChild;
    appScreen.appendChild(appElement);

    document.getElementById('leaderboard-back-btn').addEventListener('click', () => {
        document.getElementById('snake-menu_screen').remove();
        showMenuScreen();
    });
}
