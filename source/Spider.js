Centipede.Spider = function (game, player, obstacles, bullets) {
	
	this.game = game;
	this.player = player;
	this.bullets = bullets;
	this.obstacles = obstacles;
	this.spider = null;

	this.isSpiderPresent = false;
	this.timer = null; 
	this.movementTimer = null;
	this.LtoR = true;
	this.moveTimerStarted = false;
	this.moveDirection = 1; //Possible values 1, 2, 3, 4 

	return this;

}


Centipede.Spider.prototype = {


	initialize : function() {

		//Spider init
		this.isSpiderPresent = true;
		if (this.LtoR)
			this.spider = this.game.add.sprite(0, this.game.world.height - (50 + Math.random()*200), 'spider');
		else
			this.spider = this.game.add.sprite(this.game.world.width, this.game.world.height - (50 + Math.random()*200), 'spider');
		
		this.spider.anchor.setTo(0.5, 0.5);
		this.game.physics.arcade.enable(this.spider);
		//spider.animations.add('change', [0, 1, 2, 3], true);
		
		this.spider.checkWorldBounds = true;
		this.spider.body.velocity.x = 0;
		this.spider.body.velocity.y = 0;

	},

	update : function() {

		if (!this.isSpiderPresent)
		{
			if (this.LtoR)
				this.LtoR = false;
			else
				this.LtoR = true;
			
			this.startRespawnTimer();
		}	
		else
		{
			this.game.physics.arcade.overlap(this.bullets, this.spider, this.killSpider, null, this);
			this.game.physics.arcade.overlap(this.player, this.spider, this.player.killPlayer, null, this);

			//spider.play('change', 10);
			this.spider.events.onOutOfBounds.add(this.removeSpider, this);
			
			//Code to control spider movement
			if (this.LtoR)
			{
				if (this.moveDirection == 1){
					this.spider.body.velocity.y = 0;
					this.spider.body.velocity.x = 50;
					this.movementChangeTimer();
				}	
				else if (this.moveDirection == 2){
					this.spider.body.velocity.x = 50;
					this.spider.body.velocity.y = 50;
					this.movementChangeTimer();
				}
				else if(this.moveDirection == 3){
					this.spider.body.velocity.x = 0;
					this.spider.body.velocity.y = -50;
					this.movementChangeTimer();
				}
				else{
					this.spider.body.velocity.x = 0;
					this.spider.body.velocity.y = 50;
					this.movementChangeTimer();
				}
			}
			else
			{
				if (this.moveDirection == 1){
					this.spider.body.velocity.y = 0;
					this.spider.body.velocity.x = -50;
					this.movementChangeTimer();
				}	
				else if (this.moveDirection == 2){
					this.spider.body.velocity.x = -50;
					this.spider.body.velocity.y = 50;
					this.movementChangeTimer();
				}
				else if(this.moveDirection == 3){
					this.spider.body.velocity.x = 0;
					this.spider.body.velocity.y = -50;
					this.movementChangeTimer();
				}
				else{
					this.spider.body.velocity.x = 0;
					this.spider.body.velocity.y = 50;
					this.movementChangeTimer();
				}
			}	
		}
	},

	//Called when the player shoots the spider
	killSpider : function(spider, bullet) {

		bullet.kill();
		spider.kill();
		this.isSpiderPresent = false;
		this.moveDirection = 1;
		
		//this.score += 10;
		//this.scoreText.text = score;

	},

	//Called when the spider moves out of the window
	removeSpider : function(spider){

		spider.kill();
		this.isSpiderPresent = false;
		this.moveDirection = 1;

	},

	//These two functions control random movement of the spider

	movementChangeTimer : function() {

		if (!this.moveTimerStarted)
		{
			this.moveTimerStarted = true;
			
			var timerEvent;
		
			// Create a custom timer
			this.movementTimer = this.game.time.create();
			
			// Create a delayed event 10s from now
			timerEvent = this.movementTimer.add(Phaser.Timer.SECOND * 1, this.endMovementTimer, this);
			
			// Start the timer
			this.movementTimer.start();
		}

	},

	endMovementTimer : function() {

		this.movementTimer.stop();
		this.moveTimerStarted = false;
		
		var check = Math.random();
		if (check < 0.25)
			this.moveDirection = 4;
		
		else if (check >= 0.25 && check <0.5)
			this.moveDirection = 3;
		
		else if (check >= 0.5 && check <0.75)
			this.moveDirection = 2;
		
		else
			this.moveDirection = 1;

	},


	//these 2 functions control spider respawn

	startRespawnTimer : function() {

		var timerEvent;
		
		this.isSpiderPresent = true;
		
		// Create a custom timer
		this.timer = this.game.time.create();
		
		// Create a delayed event 10s from now
		timerEvent = this.timer.add(Phaser.Timer.SECOND * 2, this.endRespawnTimer, this);
		
		// Start the timer
		this.timer.start();

	},

	endRespawnTimer : function() {

		this.timer.stop();

		this.initialize();

	}
};

Centipede.Spider.prototype.constructor = Centipede.Spider;
