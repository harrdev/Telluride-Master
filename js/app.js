// Code out start button event.  Button click will include the start() function
// Start with fixed objects(trees/players)
// basic boxes for now
// Code out score keeper
// Do I need DOMContent loaded????
// Trees should scroll up
// Once trees are working and loaded and moving up, remove Skier down movement and up movement.  Skier should only be able to move left and right

// Game board 
const game = document.getElementById("canvas")
// Set up height and width variables based on computed style
game.setAttribute("width", getComputedStyle(game)["width"])
game.setAttribute("height", getComputedStyle(game)["height"])
console.log("Game width: ", game.width)
console.log("Game height: ", game.height)
// Get game's context, use Canvas method getContext
const ctx = game.getContext("2d")
const audio = new Audio("files/gameMusic.wav")
let gameStateActive = true
// Array to push out and pop in trees.  Need to create for loop for this
// Class constructor needs to be filled out to be able to create 1 by calling a newTree.  Once that works, a For Loop needs to be created to pop in a bunch of trees into the array.  Then a Math.random() has to be applied to randomly select a x-coordinate at the bottom of the screen and have velocity upwards in a straight line.  Once it passes the y-0 axis, it needs to pop out of the array
const trees = []
class Tree {
    constructor() {
        this.x = x
        this.y = y
    }
    draw = function() {
        let height = 50 * Math.cos(Math.PI / 7);
        // Would need to instantiate these and place them randomly along x-axis and y-axis(minus 300)(to account for them being below the skier)
        ctx.beginPath();
        ctx.moveTo(110, 300);
        ctx.lineTo(150, 300);
        ctx.lineTo(131, 300 - height);
        ctx.closePath();
        // The outline of tree
        ctx.lineWidth = 10;
        ctx.strokeStyle = '#249225';
        ctx.stroke();
        // Filling in tree with color and drawing it
        ctx.fillStyle = "#249225";
        ctx.fill();
    }
}

class Skier {
    constructor(x, y, color, width, height) {
        this.x = x
        this.y = y
        this.color = color
        this.width = width
        this.height = height
        this.alive = true
        this.direction = {
            up: false,
            down: false,
            right: false,
            left: false
        }
    }
    // Key directions
    setDirection(key) {
        if (key.toLowerCase() == "w") this.direction.up = true
        if (key.toLowerCase() == "s") this.direction.down = true
        if (key.toLowerCase() == "a") this.direction.left = true
        if (key.toLowerCase() == "d") this.direction.right = true
    }
    unsetDirection(key) {
        if (key.toLowerCase() == "w") this.direction.up = false
        if (key.toLowerCase() == "s") this.direction.down = false
        if (key.toLowerCase() == "a") this.direction.left = false
        if (key.toLowerCase() == "d") this.direction.right = false
    }
    movePlayer() {
        // ***** TAKE OUT DIRECTION UP WHEN DONE, TESTING
        // move up
        if (this.direction.up) this.y -= 5
        if (this.y <= 0) {
            this.y = 0
        }
        // move left
        if (this.direction.left) this.x -= 5
        if (this.x <= 0) {
            this.x = 0
        }
        // move down
        if (this.direction.down) this.y += 5
        if (this.y + this.height >= game.height) {
            this.y = game.height - this.height
        }
        // move right
        if (this.direction.right) this.x += 5
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
// Initialize Skier and Tree
let player = new Skier(x, y, "#FF0000", 20, 20)
let tree = new Tree(600,600)
// Main program, starts game
function start () { 
    // requestAnimationFrame creates a loop, passing start through it until we tell it to stop
    requestAnimationFrame(start)
    ctx.clearRect(0, 0, game.width, game.height)
    player.render()
    player.movePlayer()
    audio.play()
    tree.draw()
    pad()
    // Need to impliment random triangles below set y-axis
}
// Actually begins the game, calling start()


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

// Click event to start!  Add start button, this is useless right now
addEventListener("click", () => {
    start()
    console.log("Click event")
})

// create a timer
let sec = 0
function pad ( val ) { 
    return val > 9 ? val : "0" + val
}
setInterval( function(){
    document.getElementById("seconds").innerHTML=pad(++sec%60)
    document.getElementById("minutes").innerHTML=pad(parseInt(sec/60,10))
}, 1000)
// stop the timer *** Need to put conditional in to stop this for when player crashes



// To draw a triangle
// function drawTriangle() {
//     let height = 50 * Math.cos(Math.PI / 7);
//     // Would need to instantiate these and place them randomly along x-axis and y-axis(minus 300)(to account for them being below the skier)
//     ctx.beginPath();
//     ctx.moveTo(110, 300);
//     ctx.lineTo(150, 300);
//     ctx.lineTo(131, 300 - height);
//     ctx.closePath();
  
//     // the outline
//     ctx.lineWidth = 10;
//     ctx.strokeStyle = '#249225';
//     ctx.stroke();
  
//     // the fill color
//     ctx.fillStyle = "#249225";
//     ctx.fill();
//   }