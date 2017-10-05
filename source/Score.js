Centipede.Score = function (game) {

	this.game = game;

	this.scoreBuffer = null;
	this.scoreLabel = null;
	this.scoreLabelTween = null;

	this.liveGroup = this.game.add.group();
}



Centipede.Score.prototype = 
{

	initialize : function() {

		Centipede.score = 0;

		this.scoreBuffer = 0;

		this.createScore();

		this.createLives();

	},


	update : function() {

		//While there is score in the score buffer, add it to the actual score
		if(this.scoreBuffer > 0){
	        this.incrementScore();
	        this.scoreBuffer--;
    	}

    	if (Centipede.playerUpdate == true)
    		this.updateLives();
	},

	createLives : function() {

		for (var i = 0; i < Centipede.playerLives - 1; i++) {

			this.liveGroup.add(this.game.add.sprite(560 + 14*i, 843, 'playerLife'));
		}
	},

	updateLives : function() {

		Centipede.playerUpdate = false;
		this.liveGroup.removeAll(true);

		for (var i = 0; i < Centipede.playerLives - 1; i++) {

			this.liveGroup.add(this.game.add.sprite(560 + 14*i, 843, 'playerLife'));
		}
	},

	createScore : function() {

		var scoreFont = "30px Onky";

		//Create the score label
		this.scoreLabel = this.game.add.text(this.game.world.width/2, 0, "0", {font: scoreFont, fill: "#BB1BD3", stroke: "#3E20A2", strokeThickness: 5});
		this.scoreLabel.anchor.setTo(0.5, 0);
		this.scoreLabel.align = 'center';

		//Create a tween to grow and shrink the score label
		this.scoreLabelTween = this.game.add.tween(this.scoreLabel.scale).to({ x: 1.5, y: 1.5}, 200, Phaser.Easing.Linear.In).to({ x: 1, y: 1}, 200, Phaser.Easing.Linear.In);
	},

	incrementScore: function(){
 	 
	    //Increase the score by one and update the total score label text
	    Centipede.score += 1;   
	    this.scoreLabel.text = Centipede.score;      
 
	},


	createScoreAnimation: function(x, y, message, score){
	 
	    var scoreFont = "20px Onky";
	 
	    //Create a new label for the score
	    var scoreAnimation = this.game.add.text(x, y, message, {font: scoreFont, fill: "#BB1BD3", stroke: "#ffffff", strokeThickness: 5}); 
	    scoreAnimation.anchor.setTo(0.5, 0);
	    scoreAnimation.align = 'center';
	 
	    //Tween this score label to the total score label
	    var scoreTween = this.game.add.tween(scoreAnimation).to({x:(this.game.world.width/2), y: 0}, 800, Phaser.Easing.Exponential.In, true);
	 
	    //When the animation finishes, destroy this score label, trigger the total score labels animation and add the score
	    scoreTween.onComplete.add(function(){
	        scoreAnimation.destroy();
	        this.scoreLabelTween.start();
	        this.scoreBuffer += score;
	    }, this);
	}
};

Centipede.Score.prototype.constructor = Centipede.Score;
