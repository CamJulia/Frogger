// player, enemies, items
let player;
let heart;
let allEnemies = [];

// key controls
let rightPressed = false;
let leftPressed = false;
let downPressed = false;
let upPressed = false;

// stats
let lifes = 3;
let rounds = 0;
const hearts = document.getElementById('hearts');
const roundsOutput = document.getElementById('rounds');

// check lifes left & display hearts
showLife();

// the bugs
let Enemy = function (lane, start, fast) {
    this.x = start;
    this.y = lane;
    this.fast = fast;
    this.height = 25;
    this.width = 45;
    this.sprite = 'images/enemy-bug.png';
}

// move the bugs
Enemy.prototype.update = function (dt) {
    if (this.x < 500) {
        this.x = this.x + this.fast;
    } else {
        this.x = -100;
    }
}

// draw bugs
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// create bugs
let enemy1 = new Enemy(55, -100, 3);
let enemy2 = new Enemy(140, -200, 1);
let enemy3 = new Enemy(225, -50, 2);

// put bugs in the allEnemies Array
allEnemies.push(enemy1);
allEnemies.push(enemy2);
allEnemies.push(enemy3);

// Player
let Player = function () {
    this.sprite = 'images/char-cat-girl.png';
    this.x = 200;
    this.y = 400;
    this.width = 25;
    this.height = 45;
}

// move the player around
Player.prototype.update = function (dt) {
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

    collectionDetection(heart);
}

// draw player
Player.prototype.render = function () {
    Resources.load(this.sprite);
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Place the player object in a variable called player
player = new Player();

// Heart
let Heart = function () {
    this.sprite = 'images/Heart.png';
    this.show = Math.floor(Math.random() * Math.floor(400));
    this.x = -100;
    this.y = 170;
    this.width = 25;
    this.height = 45;
}


// draw heart
Heart.prototype.render = function (dt) {
    Resources.load(this.sprite);
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// check if heart is collected
Heart.prototype.update = function () {

    
    collectionDetection(heart);
}

// call Heart
heart = new Heart();

// play again after game over
let again = document.getElementById('again');
again.addEventListener("click", reload);

// play some more after 50, 100... games
let more = document.getElementById('more');
more.addEventListener("click", overlayOff);

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

// in case of reaching the water
function win() {
    rounds++;
    roundsOutput.textContent = rounds;

    // show items
    if (rounds % 7 === 0) {
        showItem(heart);
    }

    // ask player to go outside when 50 rounds are played
    if (rounds > 0 && (rounds % 50) === 0) {
        overlayOn('win');
    }
    player.y = 400;
    player.x = 200;
    hurryBug();

    if (rounds === 2) {
        heartNow = true;
        console.log(heartNow);
    }
}

// checks if player is hit
function collisionDetection() {
    for (let i = 0; i < allEnemies.length; i++) {
        let hit = allEnemies[i];
        if (player.x + player.width > hit.x && player.x - player.width < hit.x + hit.width && player.y + player.height > hit.y && player.y - player.height < hit.y + hit.height) {

            // take one life
            lifes = lifes - 1;
            showLife();

            //  game over alert
            if (lifes === 0) {
                overlayOn('game-over');
            }

            // set player back to first position
            player.x = 200;
            player.y = 400;
        }
    }
}

// checks if player reaches item
function collectionDetection(item) {
    if (player.x + player.width > item.x && player.x - player.width < item.x + item.width && player.y + player.height > item.y && player.y - player.height < item.y + item.height) {
        hideItem(item);

        // check what item is collected
        if (item === heart && lifes < 5) {
            // add one life
            lifes = lifes + 1;
            showLife();
        }
    }
}

// speed up the bugs
function hurryBug() {
    for (let i = 0; i < allEnemies.length; i++) {
        let hit = allEnemies[i];
        hit.fast += 1;
    }
}

// show how many lifes are left
function showLife() {
    hearts.innerHTML = '';
    for (let i = 0; i < lifes; i++) {
        let heartsLeft = document.createElement('img');
        heartsLeft.setAttribute('src', 'images/Heart.png');
        hearts.appendChild(heartsLeft);
    }
}

// show overlay
function overlayOn(id) {
    document.getElementById(id).style.display = "block";
}

// hide overlay
function overlayOff() {
    document.getElementById('win').style.display = "none";
}

// reload page
function reload() {
    document.location.reload();
}

// show item
function showItem(item) {
    item.x = item.show;
}

// hide item
function hideItem(item) {
    item.x = -100;
}