Centipede.GameOver = function (game) 
{
	this.background = null;

	this.enterKey = null;

	this.scoreLabel = null;
	this.scoreLabelTween = null;
};

Centipede.GameOver.prototype = 
{		
	create: function () 
	{
		this.scale.pageAlignHorizontally = true;
		this.scale.pageAlignVertically = true;

		this.background = this.add.tileSprite(0, 0, 704, 894, "background");
		
		this.enterKey = this.input.keyboard.addKey(Phaser.Keyboard.ENTER);

		var scoreFont = "25px Onky";

		this.scoreLabel = this.game.add.text(this.game.world.width/2, this.game.world.height/2+20, "0", {font: scoreFont, fill: "#BB1BD3", stroke: "#3E20A2", strokeThickness: 5});
		this.scoreLabel.anchor.setTo(0.5, 0.5);
		this.scoreLabel.align = 'center';

		this.scoreLabel.text = "GAME OVER!\nYou scored: " + Centipede.score + "\nPress Enter to Play Again";      

	},

	update: function ()
	{    
		if(this.enterKey.isDown)
		{
			this.state.start('Game');
		}
	}
};


