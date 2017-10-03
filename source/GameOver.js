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
		this.background = this.add.tileSprite(0, 0, 704, 704, "background");
		
		this.enterKey = this.input.keyboard.addKey(Phaser.Keyboard.ENTER);

		var scoreFont = "30px Racer";

		this.scoreLabel = this.game.add.text(this.game.world.centerX, this.game.world.centerY - 100, "0", {font: scoreFont, fill: "#ffffff", stroke: "#535353", strokeThickness: 15});
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


