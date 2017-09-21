Centipede.Score = function (game) {

	this.game = game;

	this.scoreBuffer = null;
	this.scoreLabel = null;
	this.scoreLabelTween = null;
}



Centipede.Score.prototype = 
{

	initialize : function() {

		Centipede.score = 0;

		this.scoreBuffer = 0;

		this.createScore();

	},


	update : function() {

		//While there is score in the score buffer, add it to the actual score
		if(this.scoreBuffer > 0){
	        this.incrementScore();
	        this.scoreBuffer--;
    	}
	},


	createScore : function() {

		var scoreFont = "50px Arial";

		//Create the score label
		this.scoreLabel = this.game.add.text(this.game.world.centerX, 50, "0", {font: scoreFont, fill: "#ffffff", stroke: "#535353", strokeThickness: 15});
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
	 
	    var scoreFont = "30px Arial";
	 
	    //Create a new label for the score
	    var scoreAnimation = this.game.add.text(x, y, message, {font: scoreFont, fill: "#39d179", stroke: "#ffffff", strokeThickness: 15}); 
	    scoreAnimation.anchor.setTo(0.5, 0);
	    scoreAnimation.align = 'center';
	 
	    //Tween this score label to the total score label
	    var scoreTween = this.game.add.tween(scoreAnimation).to({x:this.game.world.centerX, y: 50}, 800, Phaser.Easing.Exponential.In, true);
	 
	    //When the animation finishes, destroy this score label, trigger the total score labels animation and add the score
	    scoreTween.onComplete.add(function(){
	        scoreAnimation.destroy();
	        this.scoreLabelTween.start();
	        this.scoreBuffer += score;
	    }, this);
	}
};

Centipede.Score.prototype.constructor = Centipede.Score;
