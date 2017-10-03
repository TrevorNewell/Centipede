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
	
	this.playerKilled = null;
	this.playerMove1 = null;
	this.playerMove2 = null;
	this.playerShooting1 = null;
	this.playerShooting2 = null;
	this.playerShooting3 = null;
	this.playerShooting4 = null;
	
/* 	this.playerShoot = null;
	this.playerHit = null;
	this.enemyShoot = null;
	this.enemyHit = null;
	this.obstacleHit = null; */
	
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
			this.centipedeMove1 = this.game.add.audio("centipedeMove1");
			this.centipedeMove2 = this.game.add.audio("centipedeMove2");
			this.centipedeMove3 = this.game.add.audio("centipedeMove3");
			this.centipedeSpawn = this.game.add.audio("centipedeSpawn");
			this.centipedeShooting = this.game.add.audio("centipedeShooting");

			this.playerKilled = this.game.add.audio("playerKilled");
			this.playerMove1 = this.game.add.audio("playerMove1");
			this.playerMove2 = this.game.add.audio("playerMove2");
			this.playerShooting1 = this.game.add.audio("playerShooting");
			this.playerShooting2 = this.game.add.audio("playerShooting");
			this.playerShooting3 = this.game.add.audio("playerShooting");
			this.playerShooting4 = this.game.add.audio("playerShooting");
		
			/* 		this.playerShoot = this.game.add.audio("shoot1");
					this.playerHit = this.game.add.audio("hit");
					this.enemyShoot = this.game.add.audio("shoot2");
					this.enemyHit = this.game.add.audio("hit2");
					this.obstacleHit = this.game.add.audio("hit3"); */
		}
		
		// Toggle one shot or not
		{
			this.backgroundMusic.allowMultiple = true;
				
			this.obstacleShot.allowMultiple = true;
			this.centipedeDie.allowMultiple = true;
			this.centipedeHitsWall.allowMultiple = true;
			this.centipedeMove1.allowMultiple = true;
			this.centipedeMove2.allowMultiple = true;
			this.centipedeMove3.allowMultiple = true;
			this.centipedeSpawn.allowMultiple = true;
			this.centipedeShooting.allowMultiple = true;

			this.playerKilled.allowMultiple = true;
			this.playerMove1.allowMultiple = true;
			this.playerMove2.allowMultiple = true;
			this.playerShooting1.allowMultiple = true;
			this.playerShooting2.allowMultiple = true;
			this.playerShooting3.allowMultiple = true;
			this.playerShooting4.allowMultiple = true;
			
	/* 		this.playerShoot.allowMultiple = true;
			this.playerHit.allowMultiple = true;
			this.enemyShoot.allowMultiple = true;
			this.enemyHit.allowMultiple = true;
			this.obstacleHit.allowMultiple = true; */
		
		}
		
		// Control Volume (0 to 1)
		{
			this.backgroundMusic.volume = 0.35;
			
			this.obstacleShot.volume = 0.6;
			this.centipedeDie.volume = 0.2;
			this.centipedeHitsWall.volume = 0.6;
			this.centipedeMove1.volume = 0.6;
			this.centipedeMove2.volume = 0.6;
			this.centipedeMove3.volume = 0.6;
			this.centipedeSpawn.volume = 0.5;
			this.centipedeShooting.volume = 0.5;

			this.playerKilled.volume = 0.7;
			this.playerMove1.volume = 0.6;
			this.playerMove2.volume = 0.6;
			this.playerShooting1.volume = 0.6;
			this.playerShooting2.volume = 0.5;
			this.playerShooting3.volume = 0.5;
			this.playerShooting4.volume = 0.5;
	
	/* 		this.playerShoot.volume = 1;
			this.playerHit.volume = 1;
			this.enemyShoot.volume = 1;
			this.enemyHit.volume = 1;
			this.obstacleHit.volume = 1; */
		}
		
		this.backgroundMusic.play();
	},
	
	playPlayerShoot: function ()
	{
		//if (this.playerShooting1.isPlaying == false && this.playerShooting2.isPlaying == false && this.playerShooting3.isPlaying == false && this.playerShooting4.isPlaying == false)
		//{
			this.playerShooting1.play();
			
			//this.game.camera.shake(0.00025, 200);
		//}
	},
	
	playPlayerMove: function ()
	{
		if (this.playerMove1.isPlaying == false && this.playerMove2.isPlaying == false)
		{
			var r = this.game.rnd.integerInRange(0,1); 
			if (r == 0) this.playerMove1.play();
			else if (r == 1) this.playerMove2.play();
		}
	},
	
	playCentipedeMove: function ()
	{
		if (this.centipedeMove1.isPlaying == false && this.centipedeMove2.isPlaying == false && this.centipedeMove3.isPlaying == false)
		{
			var r = this.game.rnd.integerInRange(0,2);
			if (r == 0) this.centipedeMove1.play();
			else if (r == 1) this.centipedeMove2.play();
			else if (r == 2) this.centipedeMove3.play();
		}
	},
	
	playPlayerDeath : function()
	{
		this.playerKilled.play();
	},
	
	playCentipedeShoot: function ()
	{
		//if (this.centipedeShooting2.isPlaying == false && this.centipedeShooting3.isPlaying == false && this.centipedeShooting4.isPlaying == false)
		//{
			this.centipedeShooting.play();
	
			this.game.camera.shake(0.00025, 200);
		//}
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
	
	playObstacleShot : function()
	{
		this.obstacleShot.play();
	},
	
};

Centipede.Sound.prototype.constructor = Centipede.Sound;
