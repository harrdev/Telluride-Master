// Draw screen
    // Start with fixed objects(trees/players)
    // basic boxes for now
// Code out player movement function
// Code out timer
// Code out score keeper

const game = document.getElementById("canvas")
// Set up height and width variables based on computed style
game.setAttribute("width", getComputedStyle(game)["width"])
game.setAttribute("height", getComputedStyle(game)["height"])
console.log("Game width: ", game.width)
console.log("Game height: ", game.height)
// Get game's context, use Canvas method getContext
const ctx = game.getContext("2d")

// Create classes (player, trees)
class Trees {
    constructor(x, y, color, width, height) {
        this.x = x
        this.y = y
        this.color = color
        this.width = width
        this.height = height
        this.alive = true
    }
    render = function () {
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.width, this.height)
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
            // don't need up up: false,
            down: false,
            right: false,
            left: false
        }
    }
    // Key directions
    setDirection(key) {
        if (key.toLowerCase() == "s") this.direction.down = true
        if (key.toLowerCase() == "a") this.direction.left = true
        if (key.toLowerCase() == "d") this.direction.right = true
    }
    unsetDirection(key) {
        if (key.toLowerCase() == "s") this.direction.down = false
        if (key.toLowerCase() == "a") this.direction.left = false
        if (key.toLowerCase() == "d") this.direction.right = false
    }
    movePlayer () {
        if (this.direction.up) this.y -= 10
            if (this.y <= 0) {
                this.y = 0
            }
        if (this.direction.left) this.x -= 10
            if (this.x <= 0) {
                this.x = 0
            }
            // move down
        if (this.direction.down) this.y += 10
            if (this.y + this.height >= game.height) {
                this.y = game.height - this.height
            }
            // move right
        if (this.direction.right) this.x += 10
            if (this.x + this.width >= game.width) {
                this.x = game.width - this.width
            }
    render = function () {
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
}

// Function to calculate random coordinates for trees
// const randomTrees = (max) => {
//     need to insert correct y-axis coords to stay below
// }

let player = new Skier(10,10,"#FF0000", 16, 16)

const gameLoop = () => {
    // clear the canvas
    ctx.clearRect(0, 0, game.width, game.height)
  
    // display relevant game state(player movement) in our movement display
    moveDisplay.innerText = `X: ${player.x}\nY: ${player.y}`
    // check if the ogre is alive, if so, render the ogre
    // if (ogre.alive) {
    //     ogre.render()
    //     // add in our detection to see if the hit has been made
    //     detectHit(ogre)
    // } else if (ogreTwo.alive) {
    //     document.querySelector('#btm-right > h2').innerText = 'Now Kill Shrek 2!'
    //     ogreTwo.render()
    //     detectHit(ogreTwo)
    // } else {
    //     stopGameLoop()
    //     document.querySelector('#btm-right > h2').innerText = 'You Win!'
    // }
    // when ogre 1 dies, show ogre 2, run detect hit on ogre 2, but make the logic dependent on that ogre's alive
    // render our player
    player.render()
    player.movePlayer()
}

// Functions for player movement
document.addEventListener('keydown', (e) => {
    player.setDirection(e.key)
})
// this will unset direction
document.addEventListener('keyup', (e) => {
    if(['a', 's', 'd'].includes(e.key)) {
        player.unsetDirection(e.key)
    }
})
