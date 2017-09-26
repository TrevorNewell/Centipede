Centipede.Preloader = function (game)
{

};

Centipede.Preloader.prototype = 
{

	preload: function () 
	{
		this.load.image('player', 'assets/enemyBlue.png'); //Player object
		this.load.spritesheet('obstacle', 'assets/obstacle.png', Centipede.spriteSize, Centipede.spriteSize); //Obstacle Class
		this.load.image('centipedeHead', 'assets/centipedeHead.png'); //Centipede Class
		this.load.image('centipedeBody', 'assets/centipedeBody.png');
		this.load.image('enemy', 'assets/enemy.png');
		this.load.image('enemyBlue', 'assets/enemyBlue.png');
		this.load.image('enemyRed', 'assets/enemyRed.png');
		this.load.image('spider', 'assets/spider.png');
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