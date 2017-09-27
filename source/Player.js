Centipede.Player = function (game, movement, map, layout) 
{
	
	this.game = game;
	this.movement = movement;
	this.map = map;
	this.layout = layout;
	
	this.player = null;
	
	return this;
};

Centipede.Player.prototype = 
{

	initialize: function () {

		// The player and its settings
    	this.player = this.game.add.sprite(48, 356, 'player');
    	this.player.anchor.set(0.5);

		this.player.scale.setTo(0.9,0.9);
		//  We need to enable physics on the player
    	this.game.physics.arcade.enable(this.player);

    	this.player.body.collideWorldBounds = true;
	},


	update: function () 
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
			this.player.body.velocity.y = -Centipede.playerMoveSpeed;
			this.player.angle = 270;
		}
		else if (this.movement.down.isDown)
		{
			this.player.body.velocity.y = Centipede.playerMoveSpeed;
			this.player.angle = 90;
		}

		this.game.physics.arcade.collide(this.player, this.layout);
	},
	
	returnPlayer : function()
	{
		return this.player;
	}
};

Centipede.Player.prototype.constructor = Centipede.Player;
