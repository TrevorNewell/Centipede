Centipede.Boundary = function (game) 
{
	
	this.game = game;

	this.boundary = null;

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

		this.bottomBorder = this.boundary.create(0, (this.game.height/Centipede.gridsizeY)*17 , null);
		this.bottomBorder.body.immovable = true;
		this.bottomBorder.body.setSize(this.game.width, 1);

		this.topBorder = this.boundary.create(0, (this.game.height/Centipede.gridsizeY)*12, null);
		this.topBorder.body.immovable = true;
		this.topBorder.body.setSize(this.game.width, 1);
	},

	returnBoundary : function () 
	{
		return this.boundary;
	}

};

Centipede.Boundary.prototype.constructor = Centipede.Boundary;
