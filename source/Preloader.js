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
		this.load.image('enemyTurretHull', 'assets/enemyTurretHull.png');
		this.load.image('enemyTurret', 'assets/turret.png');

		this.load.image('spider', 'assets/spider.png');
		
		this.load.image('bullet', 'assets/bullet.png'); //Projectile Class
		
		// Sounds
		this.load.audio('hit', 'assets/Sounds/hit.wav');
		this.load.audio('hit1', 'assets/Sounds/hit1.wav');
		this.load.audio('hit2', 'assets/Sounds/hit2.wav');
		this.load.audio('hit3', 'assets/Sounds/hit3.wav');
		this.load.audio('shoot', 'assets/Sounds/shoot.wav');
		this.load.audio('shoot1', 'assets/Sounds/shoot1.wav');
		this.load.audio('shoot2', 'assets/Sounds/shoot2.wav');
		this.load.audio('shoot3', 'assets/Sounds/shoot3.wav');
		this.load.audio('background', 'assets/Sounds/background.mp3');

	},

	create: function () 
	{
		this.state.start('Game');
	},

	update: function () 
	{

	}

};