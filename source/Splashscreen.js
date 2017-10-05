Centipede.Splashscreen = function (game) 
{
	this.background = null;
	this.animation = null;
	this.enterKey = null;
};

Centipede.Splashscreen.prototype = 
{		
	create: function () 
	{
		this.scale.pageAlignHorizontally = true;
		this.scale.pageAlignVertically = true;
		
		this.background = this.game.add.sprite(100, this.game.world.centerY - 50, 'logo');
		this.animation = this.background.animations.add('tween');

		this.background.scale.setTo(0.25);

		this.background.animations.play('tween', 10, true);

		this.enterKey = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	},

	update: function ()
	{    
		if(this.enterKey.isDown)
		{
			this.state.start('Game');
		}
	}
};


