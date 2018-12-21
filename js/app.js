let player;
let allEnemies = [];
let rightPressed = false;
let leftPressed = false;
let downPressed = false;
let upPressed = false;
let lifes = 3;
let rounds = 0;
const hearts = document.getElementById('hearts');
const roundsOutput = document.getElementById('rounds');

// Enemies our player must avoid
let Enemy = function (lane, start, fast) {
    this.x = start;
    this.y = lane;
    this.fast = fast;
    this.height = 25;
    this.width = 45;
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

// draw enemy
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player
let Player = function () {
    this.sprite = 'images/char-cat-girl.png';
    this.x = 200;
    this.y = 400;
    this.width = 25;
    this.height = 45;
}

// move the player around
Player.prototype.update = function () {
    if (rightPressed && player.x < 410) {
        player.x += 5;
    } else if (leftPressed && player.x > 0) {
        player.x -= 5;
    } else if (upPressed && player.y > -30) {
        player.y -= 5;
    } else if (downPressed && player.y < 400) {
        player.y += 5;
    }
    // check if player is hit
    collisionDetection();
    if (player.y === -30) {
        win();
    }
}

// draw player
Player.prototype.render = function () {
    Resources.load(this.sprite)
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// create enemies
let enemy1 = new Enemy(55, -100, 5);
let enemy2 = new Enemy(140, -200, 3);
let enemy3 = new Enemy(225, -50, 4);

// put them in the allEnemies Array
allEnemies.push(enemy1);
allEnemies.push(enemy2);
allEnemies.push(enemy3);

// Place the player object in a variable called player
player = new Player();

// listen for keyboard events
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

// keys are pressed
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

// keys are not pressed anymore
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

// in case of win
function win() {
    rounds += 1;
    player.y = 400;
    player.x = 200;
    roundsOutput.textContent = rounds;
}

// checks if player is hit
function collisionDetection() {
    for (let i = 0; i < allEnemies.length; i++) {
        let hit = allEnemies[i];
        if (player.x + player.width > hit.x && player.x - player.width < hit.x + hit.width && player.y + player.height > hit.y && player.y - player.height < hit.y + hit.height) {
            player.x = 200;
            player.y = 400;
        }
    }
}