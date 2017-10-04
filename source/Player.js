Centipede.Player = function (game, movement, map, layout, boundary) 
{	
	this.movementType = 1;
	
	this.game = game;
	this.movement = movement;
	this.map = map;
	this.layout = layout;
	this.boundary = boundary;

	this.player = null;
	this.timer = null; //For Respawning the player

	this.shoot = null;

	this.respawn = 0; //This is retuned by update, to determine when the game needs to kill and respawn all Centipedes

	return this;
};

Centipede.Player.prototype = 
{
	initialize: function () {

		// The player and its settings
    	this.player = this.game.add.sprite(this.game.width/2, this.game.height/2, 'player');

    	this.player.anchor.set(0.5);

		this.player.scale.setTo(0.9,0.9);
		//  We need to enable physics on the player
    	this.game.physics.arcade.enable(this.player);

    	this.player.body.collideWorldBounds = true;
		
		this.player.angle = 270;

		this.shoot = this.player.animations.add('shoot');

		this.player.frame = 0;

	},

	update: function () 
	{
		if (this.movementType == 1)
		{
			var moveSpeed = Centipede.playerMoveSpeed;
			
			//  Reset the players velocity (movement)
			this.player.body.velocity.x = 0; // We only have velocity if we are still pressing one of the keys
			this.player.body.velocity.y = 0;
			
			if (this.movement.left.isDown)
			{
				this.player.body.velocity.x = -Centipede.playerMoveSpeed;
				//this.player.angle = 180;
			}
			else if (this.movement.right.isDown)
			{
				this.player.body.velocity.x = Centipede.playerMoveSpeed;
				//this.player.angle = 0;
			}
			
			if (this.movement.up.isDown)
			{
				this.player.body.velocity.y -= moveSpeed;
				this.player.angle = 270;
			}
			else if (this.movement.down.isDown)
			{
				this.player.body.velocity.y += moveSpeed;
				this.player.angle = 90;
			}
		}
		else
		{
			//  Reset the players velocity (movement)
			this.player.body.velocity.x = 0; // We only have velocity if we are still pressing one of the keys
			this.player.body.velocity.y = 0;
			
			if (this.movement.left.isDown)
			{
				this.player.body.velocity.x = -Centipede.playerMoveSpeed;
				//this.player.angle = 180;
			}
			else if (this.movement.right.isDown)
			{
				this.player.body.velocity.x = Centipede.playerMoveSpeed;
				//this.player.angle = 0;
			}
			if (this.movement.up.isDown)
			{
				this.player.body.y = (this.game.width/Centipede.gridsizeY) * 10;
				this.player.angle = 270;
			}
			else if (this.movement.down.isDown)
			{
				this.player.body.y = (this.game.width/Centipede.gridsizeY) * 11;
				this.player.angle = 90;
			}
		}
		
		this.game.physics.arcade.collide(this.player, this.layout);
		this.game.physics.arcade.collide(this.player, this.boundary);

		return this.respawn;
	},
	
	killPlayer : function ()
	{
		this.game.camera.shake(0.03, 500);
		this.player.kill();
		if (this.player.alive == false) 
		{
			this.game.physics.arcade.isPaused = true;
			this.startRespawnTimer();
			console.log("PLAYER IS DEAD");
		}
		
		Centipede.OurSound.playPlayerDeath();
	},

	startRespawnTimer : function()
	{

		this.respawn = 1;

		var timerEvent;
		
		// Create a custom timer
		this.timer = this.game.time.create();
		
		// Create a delayed event 3s from now
		timerEvent = this.timer.add(Phaser.Timer.SECOND * 3, this.endRespawnTimer, this);
		
		// Start the timer
		this.timer.start();

		//Pause the game

	},

	endRespawnTimer : function() 
	{
		this.respawn = 0;
		
		this.timer.stop();
		console.log("TIMER CHECK");
		if (Centipede.playerLives > 1)
		{
			Centipede.playerLives--;
			Centipede.playerUpdate = true;
			this.game.paused = false;
			this.reset();
		}

		else
		{
			this.game.state.start('GameOver');
		}

	},

	reset : function()
	{
		this.player.revive();
		this.player.body.x = this.game.width/2;
		this.player.body.y = (this.game.height/2);
		this.game.physics.arcade.isPaused = false;
	},

	returnPlayer : function()
	{
		return this.player;
	},

	render : function ()
	{
		this.game.debug.body(this.player);
	}
};

Centipede.Player.prototype.constructor = Centipede.Player;
