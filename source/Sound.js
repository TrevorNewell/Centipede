Centipede.Sound = function (game) {

	this.game = game;

	this.backgroundMusic = null;
	this.playerShoot = null;
	this.playerHit = null;
	this.enemyShoot = null;
	this.enemyHit = null;
	this.obstacleHit = null;
	
	this.sounds = null;
	
	return this;
};

Centipede.Sound.prototype = 
{
	initialize : function() 
	{
		//this.sounds = this.game.add.group();
		
		this.backgroundMusic = this.game.add.audio("background");
		this.playerShoot = this.game.add.audio("shoot1");
		this.playerHit = this.game.add.audio("hit");
		this.enemyShoot = this.game.add.audio("shoot2");
		this.enemyHit = this.game.add.audio("hit2");
		this.obstacleHit = this.game.add.audio("hit3");
		
		this.backgroundMusic.allowMultiple = true;
		this.playerShoot.allowMultiple = true;
		this.playerHit.allowMultiple = true;
		this.enemyShoot.allowMultiple = true;
		this.enemyHit.allowMultiple = true;
		this.obstacleHit.allowMultiple = true;
		
		this.backgroundMusic.volume = 0.5;
		this.playerShoot.volume = 1;
		this.playerHit.volume = 1;
		this.enemyShoot.volume = 1;
		this.enemyHit.volume = 1;
		this.obstacleHit.volume = 1;
		
		this.backgroundMusic.label = "background";
		this.playerShoot.label = "playerShoot";
		this.playerHit.label = "playerHit";
		this.enemyShoot.label = "enemyShoot";
		this.enemyHit.label = "enemyHit";
		this.obstacleHit.label = "obstacleHit";
		
		//this.sounds.add(this.backgroundMusic);
		//this.sounds.add(this.playerShoot);
		//this.sounds.add(this.playerHit);
		//this.sounds.add(this.enemyShoot);
		//this.sounds.add(this.enemyHit);
		//this.sounds.add(this.backgroundMusic);
		//this.sounds.add(this.obstacleHit);
		
		this.backgroundMusic.play();
	},
	
	playPlayerShoot: function ()
	{
		this.playerShoot.play();
	}
	
};

Centipede.Sound.prototype.constructor = Centipede.Sound;
