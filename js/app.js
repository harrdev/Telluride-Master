//<-------------------------------------Global Variables------------------------------------->
const game = document.getElementById("canvas")
const ctx = game.getContext("2d")
const style = document.getElementById("style")
const message = document.getElementById("message")
const startButton = document.getElementById("start")
const level = document.getElementById("levelNumber")
const audio = new Audio("files/gameMusic.wav")
const keys = []
game.width = 600
game.height = 600
// gameFrame used as a counter, counting up every animationFrame. Used for creating delays
let gameFrame = 0
let gameOver = false
let score = 0
let highScore = 0
let stylePoints = 0
let jumping = false
let speed = 8
// jumpCounter is used to ensure when collision with jump ramp happens that the bonus is only applied once.  Used in conditional to ensure this, and reset to 0 in same block of code
let jumpCounter = 0
//<-----------------------------------Player/Skier Section----------------------------------->
const player = {
    // Game.width & height set this way to place player in middle top portion of canvas
    x: game.width / 2,
    y: game.height / 5,
    width: 19,
    height: 34,
    sX: 65,
    sY: 0,
    speed: 2
}
const playerSprite = new Image()
playerSprite.src = "files/sprites3.png"
// Initialize skier/player. s = source, d = draw.  There are 9 args/params for ctx.drawImage with images on a sprite sheet
function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH) {
    ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH)
}
//<--------------------------------------Lift buckets Section--------------------------------->
const bucketSprite = new Image()
bucketSprite.src = "files/spritesMore.png"
let buckets = []
class Bucket {
    constructor() {
        // Game width hard coded to to make sure lifts do not overlap with ski lift
        this.x = 570
        this.y = game.height
        this.moveY = speed + 1
        this.width = 26
        this.height = 34
    }
    update() {
        this.y -= this.moveY
    }
    draw() {
        ctx.drawImage(bucketSprite, 80, 30, this.width, this.height, this.x, this.y, this.width, this.height)
    }
}
function handleBuckets() {
    if (gameFrame % 90 === 0) {
        buckets.push(new Bucket())
    }
    for (let i = 0; i < buckets.length; i++) {
        buckets[i].update()
        buckets[i].draw()
    }
    for (let i = 0; i < buckets.length; i++) {
        if (buckets[i].y < -40) {
            buckets.splice(i, 1)
        }
    }
}
//<-----------------------------------------Ski Lift Section---------------------------------->
const liftSprite = new Image()
liftSprite.src = "files/spritesMore.png"
let lifts = []
class Lift {
    constructor() {
        // Game width set to to make sure lifts are positioned exactly 
        this.x = 580
        this.y = game.height
        this.moveY = speed
        this.width = 14
        this.height = 50
    }
    update() {
        this.y -= this.moveY
    }
    draw() {
        ctx.drawImage(liftSprite, 60, 0, this.width, this.height, this.x, this.y, this.width * 1.5, this.height * 1.5)
    }
}
function handleLift() {
    if (gameFrame % 60 === 0) {
        lifts.push(new Lift())
    }
    for (let i = 0; i < lifts.length; i++) {
        lifts[i].update()
        lifts[i].draw()
    }
    for (let i = 0; i < lifts.length; i++) {
        if (lifts[i].y < -60) {
            lifts.splice(i, 1)
        }
    }
}
//<------------------------------------Tree Object Section------------------------------------>
const treeSprite = new Image()
treeSprite.src = "files/tree.png"
let trees = []
class Tree {
    constructor() {
        // Game width set to -60 to make sure trees do not overlap with ski lift
        this.x = Math.floor(Math.random() * (game.width - 60))
        this.y = game.height
        this.moveY = speed
        this.width = 34
        this.height = 64
    }
    update() {
        this.y -= this.moveY
    }
    draw() {
        ctx.drawImage(treeSprite, 0, 0, this.width, this.height, this.x, this.y, this.width * 1.5, this.height * 1.5)
    }
}
function handleTrees() {
    if (gameFrame % 12 === 0) {
        trees.push(new Tree())
    }
    for (let i = 0; i < trees.length; i++) {
        trees[i].update()
        trees[i].draw()
    }
    for (let i = 0; i < trees.length; i++) {
        if (trees[i].y < -60) {
            trees.splice(i, 1)
        }
    }
}
//<-----------------------------------Jump Bonus Section----------------------------------->
let jump = []
class JumpBonus {
    constructor() {
        // game.width -50 to ensure jump ramps don't conflict with ski lifts
        this.x = Math.floor(Math.random() * (game.width - 50))
        this.y = game.height + Math.random() * game.height
        this.moveY = speed
        this.width = 50
        this.height = 8
    }
    update() {
        this.y -= this.moveY
    }
    draw() {
        ctx.beginPath()
        ctx.rect(this.x, this.y, this.width, this.height)
        ctx.fillStyle = "#0000FF"
        ctx.fill()
    }
}
function handleBonus() {
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
        // The +/- numbers are for some leeway in collision
        if (trees[i].x > player.x + player.width - 5 ||
            trees[i].x + trees[i].width - 2 < player.x ||
            trees[i].y > player.y + player.height - 5 ||
            trees[i].y + trees[i].height - 5 < player.y) {
            // No collision
        } else {
            // Collision occuring
            gameOver = true
        }
    }
    for (let i = 0; i < lifts.length; i++) {
        if (lifts[i].x > player.x + player.width ||
            lifts[i].x + lifts[i].width < player.x ||
            lifts[i].y > player.y + player.height ||
            lifts[i].y + lifts[i].height < player.y) {
            // No collision
        } else {
            // Collision occuring
            gameOver = true
        }
    }
    for (let i = 0; i < jump.length; i++) {
        if (jump[i].x > player.x + player.width ||
            jump[i].x + jump[i].width < player.x ||
            jump[i].y > player.y + player.height ||
            jump[i].y + jump[i].height < player.y) {
            // No collision
            // Nothing to do if there's no collision
        } else {
            //<--------------------------------------Jump Logic---------------------------------------->
            jumpCounter++
            message.style.display = "block"
            message.innerText = "25 Style points added!"
            player.sX = 83
            player.width = 36
            jumping = true
            if (jumpCounter === 1) {
                stylePoints += 25
                setTimeout(() => {
                    jumping = false
                    player.width = 19
                    player.sX = 65
                    message.innerText = ""
                    jumpCounter = 0
                }, 400);
            }
        }
    }
}
//<------------------------------------Increases speed by score------------------------------>
const easy = () => {
    if (score > 200) {
        speed = 9
        level.style.color = "orange"
        level.innerText = "Level 2"
    }
    if (score > 400) {
        speed = 10
        level.style.color = "red"
        level.innerText = "Level 3"
    }
    if (score > 600) {
        speed = 11
        level.style.color = "#8b0000"
        level.innerText = "Level 4"
    }
}
//<-----------------------------------------Game Loop----------------------------------------->
function start() {
    if (gameOver === false) {
        requestAnimationFrame(start)
        ctx.clearRect(0, 0, game.width, game.height)
        drawSprite(playerSprite, player.sX, player.sY, player.width, player.height, player.x, player.y, player.width * 1.5, player.height * 1.5)
        audio.play()
        handleBonus()
        handleTrees()
        handleLift()
        handleBuckets()
        detectCollision()
        movePlayer()
        easy()
        gameFrame = gameFrame + 1
        score = Math.floor(gameFrame / 60 * 10) + stylePoints
        points.textContent = score
    } else {
        endGame()
    }
}
//<------------------------------------End Game function------------------------------------>
// Resets game arrays, states, positioning
const endGame = () => {
    stylePoints = 0
    jumping = false
    gameOver = false
    audio.pause()
    audio.currentTime = 0.0
    startButton.style.display = "block"
    trees = []
    jump = []
    buckets = []
    lifts = []
    speed = 8
    moveUp = 8
    if (score > highScore) {
        highScore = score
        message.style.display = "block"
        message.innerText = "You beat the high score!\nTry it again!"
        document.getElementById("high").innerHTML = highScore
    } else {
        message.style.display = "block"
        message.innerText = "Try again!"
    }
    score = 0
    gameFrame = 0
    player.x = game.width / 2
    player.y = game.height / 5
    player.sX = 65
    player.sY = 0
    player.width = 19
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
    player.width = 19
})
function movePlayer() {
    if ((keys[65] || keys[37]) && player.x > 0 && jumping === false) {
        player.x -= player.speed
        player.sX = 26
        player.width = 19
    }
    if ((keys[68] || keys[39]) && player.x < game.width - player.width - 5 && jumping === false) {
        player.x += player.speed
        player.sX = 46
        player.width = 19
    }
}
//<--------------------------------Start button event listener-------------------------------->
document.getElementById("start").addEventListener("click", () => {
    startButton.style.display = "none"
    message.style.display = "none"
    level.style.color = "green"
    level.innerText = "Level 1"
    start()
})