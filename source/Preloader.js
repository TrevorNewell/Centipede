Centipede.Preloader = function (game) {

};

Centipede.Preloader.prototype = {

	preload: function () {

	this.load.image('player', 'assets/player.png'); //Player object
	//this.load.spritesheet('obstacle', 'assets/obstacle.png', Centipede.spriteSize, Centipede.spriteSize); //Obstacle Class
	this.load.image('centipedeHead', 'assets/centipedeHead.png'); //Centipede Class
	this.load.image('obstacle', 'assets/mushroom1.png'); //Centipede Class
	this.load.image('centipedeBody', 'assets/centipedeBody.png');
	this.load.image('bullet', 'assets/newBullet.png'); //Projectile Class
	this.load.image('border', 'assets/borderPixel.png'); //Setup
	this.load.tilemap('map', 'assets/tempmap.csv', null, Phaser.Tilemap.CSV);

	},

	create: function () {

		this.state.start('Game');

	},

	update: function () {

	}

};