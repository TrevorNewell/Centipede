Centipede.Boundary = function (game) 
{
	
	this.game = game;

	this.boundary = null;
	//this.leftBorder = null;
	//this.rightBorder = null;
	this.bottomBorder = null;
	this.topBorder = null;

	return this;

};

Centipede.Boundary.prototype = 
{

	initialize: function () 
	{

		this.boundary = this.game.add.group();
		this.boundary.enableBody = true;
		this.game.physics.arcade.enable(this.boundary);

		/*
		this.leftBorder = this.boundary.create(-1, 0, 'border');
		this.leftBorder.body.immovable = true;
		this.leftBorder.scale.setTo(1, Centipede.windowHeight);
		
		this.rightBorder = this.boundary.create(Centipede.windowWidth, 0, 'border');
		this.rightBorder.body.immovable = true;
		this.rightBorder.scale.setTo(1, Centipede.windowHeight);
		*/
		this.bottomBorder = this.boundary.create(0, 415 , null);
		this.bottomBorder.body.immovable = true;
		this.bottomBorder.body.setSize(this.game.width, 1);

		this.topBorder = this.boundary.create(0, 255, null);
		this.topBorder.body.immovable = true;
		this.topBorder.body.setSize(this.game.width, 1);

	},

	returnBoundary : function () 
	{
		return this.boundary;
	}

};

Centipede.Boundary.prototype.constructor = Centipede.Boundary;
