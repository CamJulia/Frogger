let player;
let allEnemies = [];

// Enemies our player must avoid
var Enemy = function (road) {
    this.x = 0;
    this.y = (60 * road);
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    
    
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    
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

Player.handleInput = function (direction) {
    if (direction = 37) {
        this.x = this.x -20;
    }
    if (direction = 38) {
        this.y = this.y -20;
    }
    if (direction = 39) {
        this.x = this.x + 20;
    }
    if (direction = 40) {
        this.y = this.y + 20;
    }
}
// This class requires an update(), render() and
// a handleInput() method.

Player.prototype.update = function () {
    
}

Player.prototype.render = function () {
    Resources.load(this.sprite)
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// create enemy 1
let enemy1 = new Enemy(1);
let enemy2 = new Enemy(2.4);
let enemy3 = new Enemy(3.8);
// put it in the allEnemies Array
allEnemies.push(enemy1);
allEnemies.push(enemy2);
allEnemies.push(enemy3);

// Place the player object in a variable called player
player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
