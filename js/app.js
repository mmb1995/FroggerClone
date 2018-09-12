

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    
    // Randomly generates the starting position for the bug enemies
    this.setToStartPos();
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
        this.x = (this.x + this.speed);
        this.y = 83 * this.row;
        
        if (this.x > 5 * 83) {
            this.setToStartPos();
        }
        
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.setToStartPos = function() {
    this.col = -1;
    this.row = getRandomInt(1, 3);
    this.x = 101 * this.col;
    this.y = 83 * this.row;
    this.speed = getRandomInt(2,6);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {
    // The image/sprite for the player character
    this.sprite = "images/char-boy.png";
    
    // Sets initial location for the player
    this.setToStartPos();
};

Player.prototype.update = function() {
    this.x = 101 * this.col;
    this.y = 83 * this.row;
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key) {
    switch(key) {
        case 'left':
            this.col--;
            break;
        case 'right':
            this.col++;
            break;
        case 'up':
            this.row--;
            break;
        case 'down':
            this.row++;
            break;
    }
    
    // Checks to make sure the player doesn't go out of bounds
    if (this.col < 0) this.col = 0;
    if (this.col > 4) this.col = 4;
    if (this.row <= 0) this.row = 5;
    if (this.row > 5) this.row = 5;
    
};

Player.prototype.setToStartPos = function() {
    this.col = 2;
    this.row = 5;
};

// Represents a collectible for the player to collect during gameplay
var Gem = function() {
    this.sprite = 'images/Gem Blue.png';  
    this.setPos();
    
};

Gem.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Gem.prototype.setPos = function() {
    this.col = getRandomInt(0, 4);
    this.row = getRandomInt(1, 5);
    this.x = 101 * this.col;
    this.y = 83 * this.row;
};

// Keeps track of the players score and the amount of collectibles they have obtained
var ScoreBoard = function() {
    this.blueGemDisplay = document.getElementById("blue-gem-counter");
    this.blueGemCounter = 0;
};

ScoreBoard.prototype.increaseScore = function() {
    this.blueGemCounter++;
};

ScoreBoard.prototype.resetScore = function() {
    this.blueGemCounter = 0;
}

ScoreBoard.prototype.updateScores = function() {
    this.blueGemDisplay.innerHTML = "Blue Gems: " + this.blueGemCounter;
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

// Creates the Player object
var player = new Player();
var gem = new Gem();
var scoreBoard = new ScoreBoard();

// Creates the enemy objects
var allEnemies = [];
for (var i = 0; i < 3; i++) {
    allEnemies.push(new Enemy());
}



function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}




// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
