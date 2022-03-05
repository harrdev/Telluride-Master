//<-------------------------------------Global Variables------------------------------------->
const game = document.getElementById("canvas");
const ctx = game.getContext("2d");
const style = document.getElementById("style");
const message = document.getElementById("message");
const startButton = document.getElementById("start");
const level = document.getElementById("levelNumber");
const audio = new Audio("files/gameMusic.wav");
const keys = [];
game.width = 600;
game.height = 450;
// gameFrame used as a counter, counting up every animationFrame. Used for creating random delays
let gameFrame = 0;
let gameOver = false;
let score = 0;
let highScore = 0;
let stylePoints = 0;
// jumping is used to lock key events in a conditional to prevent players from moving in the air while jumping
let jumping = false;
let speed = 8;
// jumpCounter is used to ensure when collision with jumps jump happens that the bonus is only applied once.  Used in conditional to ensure this, and reset to 0 in same block of code
let jumpCounter = 0;
message.innerText =
  "Press 'a' or left arrow to turn left, 'd' or right arrow to turn right.";
//<-----------------------------------Player/Skier Section----------------------------------->
const player = {
  // Game.width & height set this way to place player in middle top portion of canvas
  x: game.width / 2,
  y: game.height / 5,
  width: 19,
  height: 34,
  sX: 65,
  sY: 0,
  speed: 2,
};
const playerSprite = new Image();
playerSprite.src = "files/sprites3.png";
// Initialize skier/player. s = source, d = destination.  There are 9 args/params for ctx.drawImage with images on a sprite sheet
function drawPlayer(img, sX, sY, sW, sH, dX, dY, dW, dH) {
  ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
}
//<-------------------------- Obstruction Sprite Class ----------------------->
class Obstruction {
  constructor(x, y, moveY, width, height) {
    this.x = x;
    this.y = y;
    this.moveY = moveY;
    this.width = width;
    this.height = height;
  }
  update() {
    this.y -= this.moveY;
  }
  draw(img, sX, sY, dX, dY) {
    ctx.drawImage(
      img,
      sX,
      sY,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width * dX,
      this.height * dY
    );
  }
}
//<--------------------------------------Lift buckets Handler Section--------------------------------->
const bucketSprite = new Image();
bucketSprite.src = "files/spritesMore.png";
let buckets = [];
function handleBuckets() {
  // in the handle functions, I'm using a gameFrame variable that is set every game loop.  It is being used as a conditional with modulus for a little randomness
  gameFrame % 90 === 0 &&
    buckets.push(new Obstruction(570, game.height, speed + 1, 26, 34));

  for (let bucket of buckets) {
    bucket.update();
    bucket.draw(bucketSprite, 80, 30, 1, 1);
  }

  for (let bucket of buckets) {
    bucket.y < -40 && buckets.splice(bucket, 1);
  }
}
//<-----------------------------------------Ski Lift Handler Section---------------------------------->
const liftSprite = new Image();
liftSprite.src = "files/spritesMore.png";
let lifts = [];
function handleLift() {
  gameFrame % 60 === 0 &&
    lifts.push(new Obstruction(580, game.height, speed, 14, 50));

  for (let lift of lifts) {
    lift.update();
    lift.draw(liftSprite, 60, 0, 1.25, 1.25);
  }

  for (let lift of lifts) {
    lift.y < -60 && lifts.splice(lift, 1);
  }
}
//<------------------------------------Tree Handler Section------------------------------------>
const treeSprite = new Image();
treeSprite.src = "files/tree.png";
let trees = [];

function handleTrees() {
  const treeStart = Math.floor(Math.random() * (game.width - 60));
  gameFrame % 12 === 0 &&
    trees.push(new Obstruction(treeStart, game.height, speed, 34, 64));

  for (let tree of trees) {
    tree.update();
    tree.draw(treeSprite, 0, 0, 1.25, 1.25);
  }

  for (let tree of trees) {
    tree.y < -60 && trees.splice(tree, 1);
  }
}
//<-----------------------------------Jump Bonus Section----------------------------------->
let jumps = [];
class JumpBonus {
  constructor() {
    // game.width -50 to ensure jump ramps don't conflict with ski lifts
    this.x = Math.floor(Math.random() * (game.width - 50));
    this.y = game.height + Math.random() * game.height;
    this.moveY = speed;
    this.width = 50;
    this.height = 8;
  }
  update() {
    this.y -= this.moveY;
  }
  draw() {
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = "#0000FF";
    ctx.fill();
  }
}
function handleBonus() {
  gameFrame % 160 === 0 && jumps.push(new JumpBonus());

  for (let jump of jumps) {
    jump.update();
    jump.draw();
  }

  for (let jump of jumps) {
    jump.y < -40 && jumps.splice(jump, 1);
  }
}
//<------------------------------------Collision Detection------------------------------------>
function detectCollision() {
  for (let tree of trees) {
    if (
      tree.x > player.x + player.width - 5 ||
      tree.x + tree.width - 2 < player.x ||
      tree.y > player.y + player.height - 5 ||
      tree.y + tree.height - 5 < player.y
    ) {
      // No collision
    } else {
      // Collision occuring
      gameOver = true;
    }
  }

  for (let lift of lifts) {
    if (
      lift.x > player.x + player.width ||
      lift.x + lift.width < player.x ||
      lift.y > player.y + player.height ||
      lift.y + lift.height < player.y
    ) {
      // No collision
    } else {
      // Collision occuring
      gameOver = true;
    }
  }

  for (let jump of jumps) {
    if (
      jump.x > player.x + player.width ||
      jump.x + jump.width < player.x ||
      jump.y > player.y + player.height ||
      jump.y + jump.height < player.y
    ) {
      // No collision
      // Nothing to do if there's no collision
    } else {
      //<--------------------------------------Jump Logic---------------------------------------->
      jumpCounter++;
      message.style.display = "block";
      message.innerText = "25 Style points added!";
      player.sX = 83;
      player.width = 36;
      jumping = true;
      // logic to ensure that the following only happens ONCE during collision detection with jumps jump
      if (jumpCounter === 1) {
        stylePoints += 25;
        setTimeout(() => {
          jumping = false;
          player.width = 19;
          player.sX = 65;
          message.innerText = "";
          jumpCounter = 0;
        }, 400);
      }
    }
  }
}
//<------------------------------------Increases speed by score------------------------------>
const difficulty = () => {
  if (score > 200) {
    speed = 9;
    level.style.color = "orange";
    level.innerText = "Level 2";
  }
  if (score > 400) {
    speed = 10;
    level.style.color = "red";
    level.innerText = "Level 3";
  }
  if (score > 600) {
    speed = 11;
    level.style.color = "#8b0000";
    level.innerText = "Level 4";
  }
};
//<-----------------------------------------Game Loop----------------------------------------->
function start() {
  if (gameOver === false) {
    requestAnimationFrame(start);
    ctx.clearRect(0, 0, game.width, game.height);
    drawPlayer(
      playerSprite,
      player.sX,
      player.sY,
      player.width,
      player.height,
      player.x,
      player.y,
      player.width * 1.25,
      player.height * 1.25
    );
    audio.play();
    handleBonus();
    handleTrees();
    handleLift();
    handleBuckets();
    detectCollision();
    movePlayer();
    difficulty();
    gameFrame = gameFrame + 1;
    score = Math.floor((gameFrame / 60) * 10) + stylePoints;
    points.textContent = score;
  } else {
    endGame();
  }
}
//<------------------------------------End Game function------------------------------------>
// Resets game arrays, states, positioning
const endGame = () => {
  stylePoints = 0;
  jumping = false;
  gameOver = false;
  audio.pause();
  audio.currentTime = 0.0;
  startButton.style.display = "block";
  trees = [];
  jumps = [];
  buckets = [];
  lifts = [];
  speed = 8;
  moveUp = 8;
  if (score > highScore) {
    highScore = score;
    message.style.display = "block";
    message.innerText = "You beat the high score!\nTry it again!";
    document.getElementById("high").innerHTML = highScore;
  } else {
    message.style.display = "block";
    message.innerText = "Try again!";
  }
  score = 0;
  gameFrame = 0;
  player.x = game.width / 2;
  player.y = game.height / 5;
  player.sX = 65;
  player.sY = 0;
  player.width = 19;
};
//<-------------------------------Keys event / movement function------------------------------->
window.addEventListener("keydown", function (e) {
  if (jumping === false) {
    keys[e.keyCode] = true;
  }
});
window.addEventListener("keyup", function (e) {
  delete keys[e.keyCode];
  player.sX = 65;
  player.width = 19;
});
function movePlayer() {
  if ((keys[65] || keys[37]) && player.x > 0 && jumping === false) {
    player.x -= player.speed;
    player.sX = 26;
    player.width = 19;
  }
  if (
    (keys[68] || keys[39]) &&
    player.x < game.width - player.width - 5 &&
    jumping === false
  ) {
    player.x += player.speed;
    player.sX = 46;
    player.width = 19;
  }
}
//<--------------------------------Start button event listener-------------------------------->
document.getElementById("start").addEventListener("click", () => {
  startButton.style.display = "none";
  message.style.display = "none";
  level.style.color = "green";
  level.innerText = "Level 1";
  start();
});

// Set up touch events for mobile, etc
game.addEventListener(
  "touchstart",
  function (e) {
    mousePos = getTouchPos(game, e);
    let touch = e.touches[0];
    const mouseEvent = new MouseEvent("mousedown", {
      clientX: touch.clientX,
      clientY: touch.clientY,
    });
    game.dispatchEvent(mouseEvent);
  },
  false
);
game.addEventListener(
  "touchend",
  function (e) {
    const mouseEvent = new MouseEvent("mouseup", {});
    game.dispatchEvent(mouseEvent);
  },
  false
);
game.addEventListener(
  "touchmove",
  function (e) {
    let touch = e.touches[0];
    const mouseEvent = new MouseEvent("mousemove", {
      clientX: touch.clientX,
      clientY: touch.clientY,
    });
    game.dispatchEvent(mouseEvent);
  },
  false
);

// Get the position of a touch relative to the canvas
function getTouchPos(canvasDom, touchEvent) {
  const rect = canvasDom.getBoundingClientRect();
  return {
    x: touchEvent.touches[0].clientX - rect.left,
    y: touchEvent.touches[0].clientY - rect.top,
  };
}
