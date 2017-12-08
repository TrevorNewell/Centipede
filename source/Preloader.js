Centipede.Preloader = function (game)
{

};

Centipede.Preloader.prototype = 
{

	preload: function () 
	{
		// Sprites
		this.load.spritesheet('player', 'assets/player_Shooting.png', 38, 27, 4); //Player object
		this.load.spritesheet('obstacle', 'assets/obstacle.png', Centipede.spriteSize, Centipede.spriteSize); //Obstacle Class
		
		this.load.spritesheet('enemy1', 'assets/enemy01AnimationSpreadsheet.png', Centipede.spriteSize, Centipede.spriteSize, 4);
		this.load.spritesheet('enemy2', 'assets/enemy02AnimationSpreadsheet.png', Centipede.spriteSize, Centipede.spriteSize, 4);
		this.load.spritesheet('enemy3', 'assets/enemy03AnimationSpreadsheet.png', Centipede.spriteSize, Centipede.spriteSize, 4);
		this.load.spritesheet('enemy4', 'assets/enemy04AnimationSpreadsheet.png', Centipede.spriteSize, Centipede.spriteSize, 4);

		this.load.image('enemyBlue', 'assets/enemyBlue.png');
		this.load.image('enemyRed', 'assets/enemyRed.png');
		
		this.load.image('enemyTurretHull', 'assets/enemyTurretHull.png');
		this.load.image('enemyTurret', 'assets/turret.png');

		this.load.spritesheet('logo', 'assets/LogoAnimation2.png', 1820, 354, 7);

		this.load.spritesheet('explosionRed', 'assets/ExplosionOrange.png', 64, 64);
		this.load.spritesheet('explosionBlue', 'assets/ExplosionBlue.png', 64, 64);

		this.load.spritesheet('poof', 'assets/Poof.png', 24, 24);
	
		this.load.image('bullet', 'assets/bullet.png'); //Projectile Class
		this.load.image('bulletOrange', 'assets/bulletOrange.png'); //Projectile Class

		this.load.image("background", "assets/background.png");

		this.load.image("playerLife", "assets/playerLife.png");
		
		this.load.audio('hit', 'assets/Sounds/Old/hit.wav');
		this.load.audio('hit1', 'assets/Sounds/Old/hit1.wav');
		this.load.audio('hit2', 'assets/Sounds/Old/hit2.wav');
		this.load.audio('hit3', 'assets/Sounds/Old/hit3.wav');
		this.load.audio('shoot', 'assets/Sounds/Old/shoot.wav');
		this.load.audio('shoot1', 'assets/Sounds/Old/shoot1.wav');
		this.load.audio('shoot2', 'assets/Sounds/Old/shoot2.wav');
		this.load.audio('shoot3', 'assets/Sounds/Old/shoot3.wav');
		
		this.load.audio('background', 'assets/Sounds/New/BackgroundMusic.mp3');
		
		this.load.audio('obstacleShot', 'assets/Sounds/New/ObstacleShooted.wav');

		this.load.audio('centipedeDie', 'assets/Sounds/New/CentipedeSectionDie.wav');
		this.load.audio('centipedeHitsWall', 'assets/Sounds/New/CentipedeHitTheWall.wav'); 

		this.load.audio('centipedeSpawn', 'assets/Sounds/New/CentipedeSpawned.wav');
		this.load.audio('centipedeShooting', 'assets/Sounds/New/CentipedeShooting.wav');

		this.load.audio('playerKilled', 'assets/Sounds/New/PlayerDie.wav');

		this.load.audio('playerShooting', 'assets/Sounds/New/PlayerShooting.wav');
	},

	create: function () 
	{
		this.state.start('Splashscreen');
	},

	update: function () 
	{

	}

};
