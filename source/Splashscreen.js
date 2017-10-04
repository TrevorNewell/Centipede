Centipede.Splashscreen = function (game) 
{
	this.background = null;

	this.enterKey = null;
};

Centipede.Splashscreen.prototype = 
{		
	create: function () 
	{
		this.background = this.add.tileSprite(0, 0, 704, 894, "splashscreen");
		
		this.enterKey = this.input.keyboard.addKey(Phaser.Keyboard.ENTER);
	},

	update: function ()
	{    
		if(this.enterKey.isDown)
		{
			this.state.start('Game');
		}
	}
};


