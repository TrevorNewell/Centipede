Centipede.Preloader = function (game)
{

};

Centipede.Preloader.prototype = 
{

	preload: function () 
	{
		// Sprites
		this.load.spritesheet('player', 'assets/playerShooting.png', Centipede.spriteSize, Centipede.spriteSize, 4); //Player object
		this.load.spritesheet('obstacle', 'assets/obstacle.png', Centipede.spriteSize, Centipede.spriteSize); //Obstacle Class
		
		this.load.spritesheet('enemy1', 'assets/enemy01AnimationSpreadsheet.png', Centipede.spriteSize, Centipede.spriteSize, 4);
		this.load.spritesheet('enemy2', 'assets/enemy02AnimationSpreadsheet.png', Centipede.spriteSize, Centipede.spriteSize, 4);
		this.load.spritesheet('enemy3', 'assets/enemy03AnimationSpreadsheet.png', Centipede.spriteSize, Centipede.spriteSize, 4);
		this.load.spritesheet('enemy4', 'assets/enemy04AnimationSpreadsheet.png', Centipede.spriteSize, Centipede.spriteSize, 4);

		this.load.image('enemyBlue', 'assets/enemyBlue.png');
		this.load.image('enemyRed', 'assets/enemyRed.png');
		this.load.image('enemyTurretHull', 'assets/enemyTurretHull.png');
		this.load.image('enemyTurret', 'assets/turret.png');

		this.load.spritesheet('explosion', 'assets/obstacle.png', Centipede.spriteSize, Centipede.spriteSize);
		
		this.load.image('bullet', 'assets/bullet.png'); //Projectile Class

		this.load.image("background", "assets/background.png");

		this.load.image("splashscreen", "assets/splashscreen.png");
		
		
		// Fonts
		//this.load.font('pixelate', 'assets/Fonts/sfpixelate.woff')
		
		
		// Sounds
		
		// Old
		this.load.audio('hit', 'assets/Sounds/Old/hit.wav');
		this.load.audio('hit1', 'assets/Sounds/Old/hit1.wav');
		this.load.audio('hit2', 'assets/Sounds/Old/hit2.wav');
		this.load.audio('hit3', 'assets/Sounds/Old/hit3.wav');
		this.load.audio('shoot', 'assets/Sounds/Old/shoot.wav');
		this.load.audio('shoot1', 'assets/Sounds/Old/shoot1.wav');
		this.load.audio('shoot2', 'assets/Sounds/Old/shoot2.wav');
		this.load.audio('shoot3', 'assets/Sounds/Old/shoot3.wav');
		 //this.load.audio('background', 'assets/Sounds/Old/background.mp3');
		
		// New
		this.load.audio('background', 'assets/Sounds/New/BackgroundMusic.mp3');
		
		this.load.audio('obstacleShot', 'assets/Sounds/New/ObstacleShooted.wav');

		this.load.audio('centipedeDie', 'assets/Sounds/New/CentipedeSectionDie.wav');
		this.load.audio('centipedeHitsWall', 'assets/Sounds/New/CentipedeHitTheWall.wav'); //this.load.audio('centipedeHitsWall', 'assets/Sounds/New/CentipedeHitTheWall.aif'); // aif, eff
		this.load.audio('centipedeMove1', 'assets/Sounds/New/CentipedeMovement.wav');
		this.load.audio('centipedeMove2', 'assets/Sounds/New/CentipedeMovement02.wav');
		this.load.audio('centipedeMove3', 'assets/Sounds/New/CentipedeMovement03.wav');
		this.load.audio('centipedeSpawn', 'assets/Sounds/New/CentipedeSpawned.wav');
		this.load.audio('centipedeShooting', 'assets/Sounds/New/CentipedeShooting.wav');//this.load.audio('playerShooting1', 'assets/Sounds/New/PlayerShooting01.flac');  // AFLAC

		this.load.audio('playerKilled', 'assets/Sounds/New/PlayerDie.wav');
		this.load.audio('playerMove1', 'assets/Sounds/New/PlayerMovement.wav');
		this.load.audio('playerMove2', 'assets/Sounds/New/PlayerMovement02.wav');
		this.load.audio('playerShooting', 'assets/Sounds/New/PlayerShooting.wav');//this.load.audio('playerShooting1', 'assets/Sounds/New/PlayerShooting01.flac');  // AFLAC
	},

	create: function () 
	{
		this.state.start('Splashscreen');
	},

	update: function () 
	{

	}

};