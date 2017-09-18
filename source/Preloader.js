Centipede.Preloader = function (game) {

};

Centipede.Preloader.prototype = {

	preload: function () {

	var spriteSize = 8;

	this.load.image('player', 'assets/player.png'); //Player object
	this.load.spritesheet('mushroom', 'assets/mushroom.png', Centipede.spriteSize, Centipede.spriteSize); //Obstacle Class
	this.load.image('centipedeHead', 'assets/centipedeHead.png'); //Centipede Class
	this.load.image('centipedeBody', 'assets/centipedeBody.png');
	this.load.image('bullet', 'assets/newBullet.png'); //Projectile Class
	this.load.image('border', 'assets/borderPixel.png'); //Setup

	},

	create: function () {

		this.state.start('Game');

	},

	update: function () {

	}

};