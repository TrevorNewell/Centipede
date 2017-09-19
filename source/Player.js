Centipede.Player = function (game, movement, obstacles) {
	
	this.game = game;
	
	this.movement = movement;

	this.player = null;
	this.playerMoveSpeed = 225*Centipede.windowScale;

	this.obstacles = obstacles;

	return this;

};

Centipede.Player.prototype = {

	initialize: function () {

		// The player and its settings
    	this.player = this.game.add.sprite(Centipede.centerLaneX, this.game.world.height - 25, 'player');
		//this.player.scale.setTo(Centipede.scale, Centipede.scale);
		this.player.scale.setTo(2, 2);

		//  We need to enable physics on the player
    	this.game.physics.arcade.enable(this.player);

    	this.player.body.collideWorldBounds = true;
	},


	update: function () {
	    //  Reset the players velocity (movement)
	    this.player.body.velocity.x = 0; // We only have velocity if we are still pressing one of the keys
		this.player.body.velocity.y = 0;
		
	    if (this.movement.left.isDown)
	    {
	        this.player.body.velocity.x = -this.playerMoveSpeed;
	    }
	    else if (this.movement.right.isDown)
	    {
	        this.player.body.velocity.x = this.playerMoveSpeed;
	    }
		
		if (this.movement.up.isDown)
		{
			this.player.body.velocity.y = -this.playerMoveSpeed;
		}
		else if (this.movement.down.isDown)
		{
			this.player.body.velocity.y = this.playerMoveSpeed;
		}

		this.game.physics.arcade.collide(this.player, this.obstacles);
	},
	
	returnPlayer : function()
	{
		return this.player;
	}
};

Centipede.Player.prototype.constructor = Centipede.Player;
