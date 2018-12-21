let player;
let allEnemies = [];
let rightPressed = false;
let leftPressed = false;
let downPressed = false;
let upPressed = false;

// Enemies our player must avoid
var Enemy = function (lane, start, fast) {
    this.x = start;
    this.y = lane;
    this.fast = fast;
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started


    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    if (this.x < 500) {
    this.x = this.x + this.fast;
    } else {
        this.x = -100;
    }
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
let Player = function () {
    this.sprite = 'images/char-cat-girl.png';
    this.x = 200;
    this.y = 400;

}

// This class requires an update(), render() and
// a handleInput() method.

Player.prototype.update = function () {

}

Player.prototype.render = function () {
    Resources.load(this.sprite)
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    if (rightPressed && player.x < 410) {
        player.x += 5;
    } else if (leftPressed && player.x > 0) {
        player.x -= 5;
    } else if (upPressed && player.y > -30) {
        player.y -= 5;
    } else if (downPressed && player.y < 400) {
        player.y += 5;
    }

};

// create enemy 1
let enemy1 = new Enemy(55, -100, 5);
let enemy2 = new Enemy(140, - 200, 3);
let enemy3 = new Enemy(225, -50, 4);
// put it in the allEnemies Array
allEnemies.push(enemy1);
allEnemies.push(enemy2);
allEnemies.push(enemy3);

// Place the player object in a variable called player
player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
// document.addEventListener('keyup', function (e) {
//     var allowedKeys = {
//         37: 'left',
//         38: 'up',
//         39: 'right',
//         40: 'down'
//     };

//     player.handleInput(allowedKeys[e.keyCode]);
// });

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if (e.keyCode == 39) {
        rightPressed = true;
    } else if (e.keyCode == 37) {
        leftPressed = true;
    } else if (e.keyCode == 38) {
        upPressed = true;
    } else if (e.keyCode == 40) {
        downPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.keyCode == 39) {
        rightPressed = false;
    } else if (e.keyCode == 37) {
        leftPressed = false;
    } else if (e.keyCode == 38) {
        upPressed = false;
    } else if (e.keyCode == 40) {
        downPressed = false;
    }
}