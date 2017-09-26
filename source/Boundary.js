Centipede.Boundary = function (game) 
{
	
	this.game = game;
	this.boundary = this.game.add.group();
	this.boundary.enableBody = true;
	
	this.leftBorder = null;
	this.rightBorder = null;
	this.bottomBorder = null;

	return this;

}

Centipede.Boundary.prototype = 
{

	initialize: function () 
	{
		//this.leftBorder = this.boundary.create(-1,0, 'border');
		//this.leftBorder.body.immovable = true;
		//this.leftBorder.scale.setTo(1,Centipede.windowHeight);
		
		//this.rightBorder = this.boundary.create(Centipede.windowWidth,0, 'border');
		//this.rightBorder.body.immovable = true;
		//this.rightBorder.scale.setTo(1,Centipede.windowHeight);
		
		//this.bottomBorder = this.boundary.create(0,Centipede.windowHeight, 'border');
		//this.bottomBorder.body.immovable = true;
		//this.bottomBorder.scale.setTo(Centipede.windowHeight,1);

	}

};

Centipede.Boundary.prototype.constructor = Centipede.Boundary;
