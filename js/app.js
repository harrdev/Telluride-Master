// Code out start button event.  Button click will include the start() function
// Code out score keeper - link to timer
// Collision detection.  Once crashed, Player2's turn.  Once Player2 crashes, end game and compare score

// Game board variable
const game = document.getElementById("canvas")
// Set up height and width for Canvas
game.width = 600;
game.height = 600;
console.log("Game width: ", game.width)
console.log("Game height: ", game.height)
let playerOneScore = 0;
let playerTwoScore = 0;
let gameFrame = 0;
// Get game's context, use Canvas method getContext
const ctx = game.getContext("2d")
const audio = new Audio("files/gameMusic.wav")
let gameStateActive = true
// Array to push in and pop out trees.
const trees = []
class Tree {
    // constructor() is template for the rectangles.  this.x and this.y are used to randomly generate where they appear on the screen
    constructor() {
        this.x = Math.floor(Math.random() * (game.width - 50))
        this.y = game.height + Math.random() * game.height
        this.moveY = 8
    }
    // update() moves the y-coordinate to move trees upward
    update() {
        this.y -= this.moveY
    }
    // draw() draws the rectangles taking this.x and this.y to determine where on the screen to draw them.  fillStyle set to green
    draw() {
        ctx.beginPath()
        ctx.rect(this.x, this.y, 40, 60)
        ctx.fillStyle = "#249225"
        ctx.fill()
    }
}
// handleTrees takes in the trees array and cycles through all that are in the array to move and draw
function handleTrees() {
    // Creates a new Tree and pushes it into the array every 10 frames
    if (gameFrame % 10 === 0) {
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
// creating class of Skier
class Skier {
    constructor(x, y, color, width, height) {
        this.x = x
        this.y = y
        this.color = color
        this.width = width
        this.height = height
        this.alive = true
        this.direction = {
            //up: false,
            //down: false,
            right: false,
            left: false
        }
    }
    // Key directions
    setDirection(key) {
        //if (key.toLowerCase() == "w") this.direction.up = true
        //if (key.toLowerCase() == "s") this.direction.down = true
        if (key.toLowerCase() == "a") this.direction.left = true
        if (key.toLowerCase() == "d") this.direction.right = true
    }
    unsetDirection(key) {
        //if (key.toLowerCase() == "w") this.direction.up = false
        //if (key.toLowerCase() == "s") this.direction.down = false
        if (key.toLowerCase() == "a") this.direction.left = false
        if (key.toLowerCase() == "d") this.direction.right = false
    }
    movePlayer() {
        // ***** TAKE OUT DIRECTION UP WHEN DONE, TESTING
        // move up
        // if (this.direction.up) this.y -= 4
        // if (this.y <= 0) {
        //     this.y = 0
        // }
        // move left
        if (this.direction.left) this.x -= 2
        if (this.x <= 0) {
            this.x = 0
        }
        // move down
        // if (this.direction.down) this.y += 4
        // if (this.y + this.height >= game.height) {
        //     this.y = game.height - this.height
        // }
        // move right
        if (this.direction.right) this.x += 2
        if (this.x + this.width >= game.width) {
            this.x = game.width - this.width
        }

    }
    render = function () {
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
}
// Setting x and y coords to place Skier
const x = game.width / 2
// Divided by 5 to be set at top mid of screen
const y = game.height / 5
// Initialize Skier and Tree (-10 on x to offset width of box)
let player = new Skier(x - 10, y, "#FF0000", 10, 20)
// Main program, starts game
function start () { 
    // requestAnimationFrame creates a loop, passing start through it until we tell it to stop
    requestAnimationFrame(start)
    ctx.clearRect(0, 0, game.width, game.height)
    player.render()
    player.movePlayer()
    audio.play()
    handleTrees()
    gameFrame++
}
// Functions for player movement, event listeners for the keys
document.addEventListener('keydown', (e) => {
    player.setDirection(e.key)
})
// this will unset direction, stopping movement
document.addEventListener('keyup', (e) => {
    if (['w', 'a', 's', 'd'].includes(e.key)) {
        player.unsetDirection(e.key)
    }
})
// Click event to start!  Add start button, this starts on mouse click now
addEventListener("click", () => {
    start()
    pad()
    // Timer starts when mouse clicked and game starts
    setInterval( function(){
        document.getElementById("seconds").innerHTML=pad(++sec%60)
        document.getElementById("minutes").innerHTML=pad(parseInt(sec/60,10))
    }, 1000)
    console.log("Click event")
})
// Updates label to reflect timer
let sec = 0
function pad ( val ) { 
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