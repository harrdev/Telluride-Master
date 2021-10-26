//<-------------------------------------Global Variables------------------------------------->
const game = document.getElementById("canvas")
const ctx = game.getContext("2d")
const style = document.getElementById("style")
const message = document.getElementById("message")
const startButton = document.getElementById("start")
game.width = 600
game.height = 600
console.log(game.width)
console.log(game.height)
let playerOneScore = 0
let playerTwoScore = 0
let gameFrame = 0
let gameOver = false
let jumpCounter = 0
let score = 0
let highScore = 0
let stylePoints = 0
let jumping = false
const keys = []
const audio = new Audio("files/gameMusic.wav")
let gameStateActive = true
//<-----------------------------------Player/Skier Section----------------------------------->
const player = {
    x: game.width / 2,
    y: game.height / 5,
    width: 19,
    height: 34,
    sX: 65,
    sY: 0,
    speed: 2
}
const playerSprite = new Image()
playerSprite.src = "files/skiSpritesFixed.png"
// Initialize skier/player
function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH) {
    ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH)
}
//<------------------------------------Tree Object Section------------------------------------>
const treeSprite = new Image()
treeSprite.src = "files/ptree.png"
let trees = []
class Tree {
    constructor() {
        this.x = Math.floor(Math.random() * (game.width - 50))
        this.y = game.height
        this.moveY = 8
        this.width = 34
        this.height = 64
    }
    // update() moves the y-coordinate to move trees upward
    update() {
        this.y -= this.moveY
    }
    draw() {
        ctx.fillRect(this.x, this.y, this.width, this.height)
        ctx.drawImage(treeSprite, 0, 0, this.width, this.height, this.x, this.y, this.width * 1.5, this.height * 1.5)
    }
}
// handleTrees takes in the trees array and cycles through all that are in the array to move and draw
function handleTrees() {
    // Creates a new Tree and pushes it into the array every 10 frames
    if (gameFrame % 12 === 0) {
        trees.push(new Tree())
        //console.log(trees.length)
    }
    // Loops through the array: Draws what's in the array and updates animation
    for (let i = 0; i < trees.length; i++) {
        trees[i].update()
        trees[i].draw()
    }
    // Checks to see if a tree has gone above the top of the screen and slices it out of the array.  Keeps array from growing too big
    for (let i = 0; i < trees.length; i++) {
        if (trees[i].y < -60) {
            trees.splice(i, 1)
        }
    }
}
//<-----------------------------------Speed Boost Section----------------------------------->
let jump = []
class JumpBonus {
    // constructor() is template for the rectangles.  this.x and this.y are used to randomly generate where they appear on the screen
    constructor() {
        this.x = Math.floor(Math.random() * (game.width - 50))
        this.y = game.height + Math.random() * game.height
        this.moveY = 8
        this.width = 50
        this.height = 8
    }
    // update() moves the y-coordinate to move trees upward
    update() {
        this.y -= this.moveY
    }
    // draw() draws the rectangles taking this.x and this.y to determine where on the screen to draw them.  fillStyle set to green
    draw() {
        ctx.beginPath()
        ctx.rect(this.x, this.y, this.width, this.height)
        ctx.fillStyle = "#0000FF"
        ctx.fill()
    }
}
function handleSpeedBoost() {
    if (gameFrame % 160 === 0) {
        jump.push(new JumpBonus())
    }
    for (let i = 0; i < jump.length; i++) {
        jump[i].update()
        jump[i].draw()
    }
    for (let i = 0; i < jump.length; i++) {
        if (jump[i].y < -40) {
            jump.splice(i, 1)
        }
    }
}
//<------------------------------------Collision Detection------------------------------------>
function detectCollision() {
    for (let i = 0; i < trees.length; i++) {
        if (trees[i].x > player.x + player.width ||
            trees[i].x + trees[i].width < player.x ||
            trees[i].y > player.y + player.height ||
            trees[i].y + trees[i].height < player.y) {
            //console.log("No Collision")
        } else {
            //console.log("Collision detected")
            gameOver = true
        }
    }
    for (let i = 0; i < jump.length; i++) {
        if (jump[i].x > player.x + player.width ||
            jump[i].x + jump[i].width < player.x ||
            jump[i].y > player.y + player.height ||
            jump[i].y + jump[i].height < player.y) {
            // If collision with jump ramp happens, run this while no collision with trees is happening
            if (jumpCounter > 0 && gameFrame % 20 === 0) {
                jumping = false
                jumpCounter = 0
                player.width = 19
                player.sX = 65
                stylePoints += 25
            }
            if (gameFrame % 200 === 0) {
                message.innerText = ""
            }
        } else {
            // Collision happening
            jumpCounter++
            message.style.display = "block"
            message.innerText = "\n25 Style points added!"
            player.sX = 83
            player.width = 36
            jumping = true
        }
    }
}
//<-----------------------------------------Game Loop----------------------------------------->
function start() {
    if (gameOver === false) {
        requestAnimationFrame(start)
        ctx.clearRect(0, 0, game.width, game.height)
        drawSprite(playerSprite, player.sX, player.sY, player.width, player.height, player.x, player.y, player.width * 1.5, player.height * 1.5)
        audio.play()
        handleTrees()
        handleSpeedBoost()
        detectCollision()
        movePlayer()
        gameFrame = gameFrame + 1
        score = Math.floor(gameFrame / 60 * 10) + stylePoints
        points.textContent = score
    } else {
        endGame()
    }
}
//<------------------------------------End Game function------------------------------------>
const endGame = () => {
    stylePoints = 0
    gameOver = false
    audio.pause()
    audio.currentTime = 0.0
    startButton.style.display = "block"
    trees = []
    jump = []
    moveUp = 8
    if (score > highScore) {
        highScore = score
        message.style.display = "block"
        message.innerText = "You beat the high score!"
        document.getElementById("high").innerHTML = highScore
    } else {
        message.style.display = "block"
        message.innerText = "Try again!"
    }
    score = 0
    gameFrame = 0
}
//<-------------------------------Keys event / movement function------------------------------->
window.addEventListener("keydown", function (e) {
    if (jumping === false) {
        keys[e.keyCode] = true
    }
})
window.addEventListener("keyup", function (e) {
    delete keys[e.keyCode]
    player.sX = 65
})
function movePlayer() {
    if (keys[65] && player.x > 0 && jumping === false) {
        player.x -= player.speed
        player.sX = 26
    }
    if (keys[68] && player.x < game.width - player.width - 5 && jumping === false) {
        player.x += player.speed
        player.sX = 46
    }
}
//<--------------------------------Start button event listener-------------------------------->
document.getElementById("start").addEventListener("click", () => {
    startButton.style.display = "none"
    message.style.display = "none"
    player.x = game.width / 2
    player.y = game.height / 5
    start()
})