// Code out start button event.  Button click will include the start() function
// Code out score keeper - link to timer
// Collision detection.  Once crashed, Player2's turn.  Once Player2 crashes, end game and compare score

// Game board variable
const game = document.getElementById("canvas")
// Set up height and width for Canvas
game.width = 600
game.height = 600
console.log("Game width: ", game.width)
console.log("Game height: ", game.height)
let playerOneScore = 0
let playerTwoScore = 0
let gameFrame = 0
let gameOver = false
const keys = []
// Get game's context, use Canvas method getContext
const ctx = game.getContext("2d")
const audio = new Audio("files/gameMusic.wav")
let gameStateActive = true
// Sprites class
const player = {
    x: game.width / 2,
    y: game.height / 5,
    width: 19,
    height: 34,
    frameX: 0,
    frameY: 0,
    speed: 3
}
const playerSprite = new Image()
playerSprite.src = "files/skiSprites.png"
// Array to push in and pop out trees.
const trees = []
class Tree {
    // constructor() is template for the rectangles.  this.x and this.y are used to randomly generate where they appear on the screen
    constructor() {
        this.x = Math.floor(Math.random() * (game.width - 50))
        this.y = game.height + Math.random() * game.height
        this.moveY = 8
        this.width = 40
        this.height = 60
    }
    // update() moves the y-coordinate to move trees upward
    update() {
        this.y -= this.moveY
    }
    // draw() draws the rectangles taking this.x and this.y to determine where on the screen to draw them.  fillStyle set to green
    draw() {
        ctx.beginPath()
        ctx.rect(this.x, this.y, this.width, this.height)
        ctx.fillStyle = "#249225"
        ctx.fill()
    }
}
// handleTrees takes in the trees array and cycles through all that are in the array to move and draw
function handleTrees() {
    // Creates a new Tree and pushes it into the array every 10 frames
    if (gameFrame % 20 === 0) {
        trees.push(new Tree())
        console.log(trees.length)
    }
    // Loops through the array: Draws what's in the array and updates animation
    for (let i = 0; i < trees.length; i++) {
        trees[i].update()
        trees[i].draw()
    }
    // Checks to see if a tree has gone above the top of the screen and slices it out of the array.  Keeps array from growing too big
    for (let i = 0; i < trees.length; i++) {
        if (trees[i].y < -40) {
            trees.splice(i, 1)
        }
    }
}
// Speed Boost
let speeds = []
class  SpeedBoost {
    // constructor() is template for the rectangles.  this.x and this.y are used to randomly generate where they appear on the screen
    constructor() {
        this.x = Math.floor(Math.random() * (game.width - 50))
        this.y = game.height + Math.random() * game.height
        this.moveY = 8
        this.width = 50
        this.height = 15
    }
    // update() moves the y-coordinate to move trees upward
    update() {
        this.y -= this.moveY
    }
    // draw() draws the rectangles taking this.x and this.y to determine where on the screen to draw them.  fillStyle set to green
    draw() {
        ctx.beginPath()
        ctx.rect(this.x, this.y, this.width, this.height)
        ctx.fillStyle = "#OOOOFF"
        ctx.fill()
    }
}
// handleTrees takes in the trees array and cycles through all that are in the array to move and draw
function handleSpeedBoost() {
    // Creates a new Tree and pushes it into the array every 10 frames
    if (gameFrame % 80=== 0) {
        speeds.push(new SpeedBoost())
        //console.log(speeds.length)
    }
    // Loops through the array: Draws what's in the array and updates animation
    for (let i = 0; i < speeds.length; i++) {
        speeds[i].update()
        speeds[i].draw()
    }
    // Checks to see if a tree has gone above the top of the screen and slices it out of the array.  Keeps array from growing too big
    for (let i = 0; i < speeds.length; i++) {
        if (speeds[i].y < -40) {
            speeds.splice(i, 1)
        }
    }
}
// creating class of Skier
// class Skier {
//     constructor(x, y, color, width, height) {
//         this.x = x
//         this.y = y
//         this.color = color
//         this.width = width
//         this.height = height
//         this.alive = true
//         this.direction = {
//             right: false,
//             left: false
//         }
//     }
//     // Key directions
//     setDirection(key) {
//         if (key.toLowerCase() == "a") this.direction.left = true
//         if (key.toLowerCase() == "d") this.direction.right = true
//     }
//     unsetDirection(key) {
//         if (key.toLowerCase() == "a") this.direction.left = false
//         if (key.toLowerCase() == "d") this.direction.right = false
//     }
//     movePlayer() {
//         if (this.direction.left) this.x -= 3
//         if (this.x <= 0) {
//             this.x = 0
//         }
//         if (this.direction.right) this.x += 3
//         if (this.x + this.width >= game.width) {
//             this.x = game.width - this.width
//         }

//     }
//     render = function () {
//         ctx.fillStyle = this.color
//         ctx.fillRect(this.x, this.y, this.width, this.height)
//     }
// }
// Collision detection
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
}
// Setting x and y coords to place Skier
const x = game.width / 2
// Divided by 5 to be set at top mid of screen
const y = game.height / 5
// Initialize Skier and Tree (-10 on x to offset width of box)
//let player = new Skier(x - 10, y, "#FF0000", 10, 20)
function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH) {
    ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH)
}
// Main program, starts game
function start() {
    // requestAnimationFrame creates a loop, passing start through it until we tell it to stop
    if (gameOver === false) { 
        requestAnimationFrame(start)
        ctx.clearRect(0, 0, game.width, game.height)
        // player.render()
        // player.movePlayer()
        drawSprite(playerSprite, 65, 0, player.width, player.height, player.x, player.y, player.width *1.5, player.height *1.5)
        audio.play()
        handleTrees()
        handleSpeedBoost()
        detectCollision()
        movePlayer()
        gameFrame++
    } else {
        audio.pause()
        // change score
        // add message for gameOver
    }
    
}

window.addEventListener("keydown", function(e) {
    keys[e.keyCode] = true
    //console.log(keys)
})
window.addEventListener("keyup", function(e) {
    delete keys[e.keyCode]
})

function movePlayer() {
    if (keys[65] && player.x > 0) {
        player.x -= player.speed
    }
    if (keys[68] && player.x > 0) {
        player.x += player.speed
    }
}
// Functions for player movement, event listeners for the keys
// document.addEventListener('keydown', (e) => {
//     player.setDirection(e.key)
// })
// // this will unset direction, stopping movement
// document.addEventListener('keyup', (e) => {
//     if (['w', 'a', 's', 'd'].includes(e.key)) {
//         player.unsetDirection(e.key)
//     }
// })
// Click event to start!  Add start button, this starts on mouse click now
addEventListener("click", () => {
    start()
    pad()
    // Timer starts when mouse clicked and game starts
    setInterval(function () {
        document.getElementById("seconds").innerHTML = pad(++sec % 60)
        document.getElementById("minutes").innerHTML = pad(parseInt(sec / 60, 10))
    }, 1000)
    console.log("Click event")
})
// Updates label to reflect timer
let sec = 0
function pad(val) {
    return val > 9 ? val : "0" + val
}

// stop the timer *** Need to put conditional in to stop this for when player crashes

// class Tree {
//     constructor(x, y) {
//         let randoX = Math.floor(Math.random() * game.width)
//         let randoY = Math.floor(Math.random() * game.height)
//         this.x = randoX
//         this.y = randoX + 215
//     }
//     draw() {
//         let height = 80 * Math.cos(Math.PI / 7)
//         // Would need to instantiate these and place them randomly along x-axis and y-axis(minus 300)(to account for them being below the skier)
//         ctx.beginPath()
//         ctx.moveTo(this.x, this.y)
//         ctx.lineTo(this.y - 150, this.y)
//         ctx.lineTo(this.y-181, this.y - height)
//         ctx.fillStyle = "#249225"
//         ctx.fill()
//     }
// }


// WORKING, BUT PROBLEMS GETTING IT TO MOVE CORRECTLY
// class Tree {
//     constructor() {
//         let randoX = Math.floor(Math.random() * game.width)
//         this.x = randoX
//         this.y = randoX + 215
//         this.moveY = 1
//         this.moveX = 1
//     }
//     // Something's not right, triangles are floating towards top left corner
//     // update moves the tree -1 y and -1 x.  If I change or delete this.x, it doesn't work anymore, it keeps moving but keeps a corner on the x-axis and stretches the triangle
//     update() {
//         this.y -= this.moveY
//         this.x -= this.moveX
//     }
//     draw() {
//         let height = 80 * Math.cos(Math.PI / 7)
//         ctx.beginPath()
//         ctx.moveTo(this.x, this.y)
//         ctx.lineTo(this.y - 150, this.y)
//         ctx.lineTo(this.y-181, this.y - height)
//         ctx.fillStyle = "#249225"
//         ctx.fill()
//     }
// }