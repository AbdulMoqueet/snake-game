const canvas = document.getElementById('game')
const ctx = canvas.getContext('2d')

class SnakePart {
    constructor(x, y) {
        this.x = x
        this.y = y
    }
}


let speed = 6,
    tileCount = 20,
    tileSize = canvas.width / tileCount - 2,
    headX = 10,
    headY = 10,
    snakeParts = [],
    tailLength = 0,
    xVelocity = 0,
    yVelocity = 0,
    appleX = Math.floor(Math.random() * tileCount),
    appleY = Math.floor(Math.random() * tileCount)
score = 0

function drawGame() {

    changeSnakePosition()
    if (isGameOver()) {

        ctx.fillStyle = 'white'
        ctx.font = '50px Verdana'
        ctx.fillText('Game Over!', canvas.width / 7, canvas.height / 2)
        ctx.font = '15px Verdana'
        ctx.fillText("Press Enter To Restart", 190, canvas.height / 2 + 50)

        return
    }
    clearScreen()

    checkAppleCollision()
    drawApple()
    drawSnake()
    drawScore()
    setTimeout(drawGame, 1000 / speed)

}

function clearScreen() {
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
}

function drawSnake() {

    ctx.fillStyle = 'green'
    for (let i = 0; i < snakeParts.length; i++) {

        let part = snakeParts[i]

        ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize)

    }

    snakeParts.push(new SnakePart(headX, headY))
    if (snakeParts.length > tailLength) {
        snakeParts.shift()
    }

    ctx.fillStyle = 'orange'
    ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize)
}

function changeSnakePosition() {
    headX += xVelocity
    headY += yVelocity
}

function drawApple() {
    ctx.fillStyle = 'red'
    ctx.fillRect(appleX * tileCount, appleY * tileCount, tileSize, tileSize)
}

function checkAppleCollision() {

    if (appleX === headX && appleY === headY) {
        appleX = Math.floor(Math.random() * tileCount)
        appleY = Math.floor(Math.random() * tileCount)
        tailLength++
        score++
    }

}

function drawScore() {
    ctx.fillStyle = 'white'
    ctx.font = '16px Verdana'
    ctx.fillText('Score: ' + score, canvas.width - 90, 20)
}

function isGameOver() {
    let gameOver = false

    if (headX < 0 || headX >= tileCount) {
        gameOver = true
    } else if (headY < 0 || headY >= tileCount) {
        gameOver = true
    }

    for (let i = 0; i < snakeParts.length; i++) {
        let part = snakeParts[i]

        if (part.x === headX && part.y === headY) {
            gameOver = true
            break
        }
    }

    return gameOver
}

window.addEventListener('keydown', function (event) {

    if (event.code === 'ArrowUp') {

        if (yVelocity === 1)
            return
        yVelocity = -1
        xVelocity = 0

    } else if (event.code === 'ArrowDown') {

        if (yVelocity === -1)
            return
        yVelocity = 1
        xVelocity = 0

    } else if (event.code === 'ArrowLeft') {

        if (xVelocity === 1)
            return
        yVelocity = 0
        xVelocity = -1

    } else if (event.code === 'ArrowRight') {

        if (xVelocity === -1)
            return
        yVelocity = 0
        xVelocity = 1

    } else if (event.code === 'Enter') {
        window.location.reload()
    }
})

drawGame()