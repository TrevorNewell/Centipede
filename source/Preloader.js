Centipede.Preloader = function (game)
{

};

Centipede.Preloader.prototype = 
{

	preload: function () 
	{

	this.load.image('player', 'assets/player.png'); //Player object
	this.load.spritesheet('obstacle', 'assets/obstacle.png', Centipede.spriteSize, Centipede.spriteSize); //Obstacle Class
	this.load.image('centipedeHead', 'assets/centipedeHead.png'); //Centipede Class
	this.load.image('centipedeBody', 'assets/centipedeBody.png');
	this.load.image('bullet', 'assets/bullet.png'); //Projectile Class
	},

	create: function () 
	{

		this.state.start('Game');

	},

	update: function () 
	{

	}

};