Centipede.Sound = function (game) {

	this.game = game;

	this.backgroundMusic = null;
	
	this.obstacleShot = null;
	this.centipedeDie = null;
	this.centipedeHitsWall = null;
	this.centipedeMove1 = null;
	this.centipedeMove2 = null;
	this.centipedeMove3 = null;
	this.centipedeSpawn = null;
	this.centipedeShooting = null;
	this.centipedeShooting2 = null;
	this.centipedeShooting3 = null;
	this.centipedeShooting4 = null;
	
	this.homingSection = null;
	
	this.playerKilled = null;
	this.playerMove1 = null;
	this.playerMove2 = null;
	this.playerShooting1 = null;
	this.playerShooting2 = null;
	this.playerShooting3 = null;
	this.playerShooting4 = null;
	
	return this;
};

Centipede.Sound.prototype = 
{
	initialize : function() 
	{
		this.sounds = this.game.add.group();
		
		// Add the audio to the game
		{
			this.backgroundMusic = this.game.add.audio("background");
			
			this.obstacleShot = this.game.add.audio("obstacleShot");
			
			this.centipedeDie = this.game.add.audio("centipedeDie");
			this.centipedeHitsWall = this.game.add.audio("centipedeHitsWall");
			
			this.homingSection = this.game.add.audio("centipedeDie");

			this.centipedeSpawn = this.game.add.audio("centipedeSpawn");
			this.centipedeShooting = this.game.add.audio("centipedeShooting");

			this.playerKilled = this.game.add.audio("playerKilled");

			this.playerShooting1 = this.game.add.audio("playerShooting");
			this.playerShooting2 = this.game.add.audio("playerShooting");
			this.playerShooting3 = this.game.add.audio("playerShooting");
			this.playerShooting4 = this.game.add.audio("playerShooting");
		
		}
		
		// Toggle one shot or not
		{
			this.backgroundMusic.allowMultiple = true;
				
			this.obstacleShot.allowMultiple = true;
			
			this.centipedeDie.allowMultiple = true;
			this.centipedeHitsWall.allowMultiple = true;
			
			this.homingSection.allowMultiple = true;

			this.centipedeSpawn.allowMultiple = true;
			this.centipedeShooting.allowMultiple = true;

			this.playerKilled.allowMultiple = true;

			this.playerShooting1.allowMultiple = true;
			this.playerShooting2.allowMultiple = true;
			this.playerShooting3.allowMultiple = true;
			this.playerShooting4.allowMultiple = true;
		}
		
		// Control Volume (0 to 1)
		{
			this.backgroundMusic.volume = 0.35;
			
			this.obstacleShot.volume = 0.6;
			this.centipedeDie.volume = 0.2;
			this.centipedeHitsWall.volume = 0.6;
			
			this.homingSection.volume = 0.8;

			this.centipedeSpawn.volume = 0.5;
			this.centipedeShooting.volume = 0.5;

			this.playerKilled.volume = 0.7;

			this.playerShooting1.volume = 0.6;
			this.playerShooting2.volume = 0.5;
			this.playerShooting3.volume = 0.5;
			this.playerShooting4.volume = 0.5;
		}
		
		if (this.backgroundMusic.isPlaying == false) this.backgroundMusic.play();
	},
	
	stopBackground: function ()
	{
		this.backgroundMusic.stop();
	},
	
	playPlayerShoot: function ()
	{
		this.playerShooting1.play();
	},
	
	playPlayerDeath : function()
	{
		this.playerKilled.play();
	},
	
	playCentipedeShoot: function ()
	{
		this.centipedeShooting.play();
		this.game.camera.shake(0.00025, 200);
	},
	
	playCentipedeSpawn : function()
	{
		this.centipedeSpawn.play();
	},
	
	playCentipedeDeath : function()
	{
		this.centipedeDie.play();
		this.game.camera.shake(0.00025, 200);
	},
	
	playHomingDeath : function()
	{
		this.homingSection.play();
		this.game.camera.shake(0.0004, 200);
	},
	
	playObstacleShot : function()
	{
		this.obstacleShot.play();
	},
	
};

Centipede.Sound.prototype.constructor = Centipede.Sound;
