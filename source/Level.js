Centipede.Level = function (game, numObstacles) 
{
	
	this.game = game;
	this.numObstacles = numObstacles;

	// this.player = player;

	this.map = null;
	this.obstacleLayer = null;

	return this;
}

Centipede.Level.prototype = 
{

	initialize: function () 
	{
		
		this.map = this.game.add.tilemap();
		this.map.addTilesetImage('obstacle');
		this.obstacleLayer = this.map.create('obstacleLayer', 20, 20, 32, 32);
		this.obstacleLayer.resizeWorld();
		this.map.setCollision([0,1,2,3], true, this.layer);
	},

	returnLevel : function () 
	{	
		return this.map;
	},

	returnLevelLayout : function ()
	{
		return this.obstacleLayer;
	},

	randomizeMap : function () 
	{	
		for (var i = 0; i < this.numObstacles; i++)
		{	
			var randX = this.game.rnd.integerInRange(0,19);
			var randY1 = this.game.rnd.integerInRange(0,7);
			var randY2 = this.game.rnd.integerInRange(12,16);
			this.map.putTile(0,randX,randY1,this.obstacleLayer);
			this.map.putTile(0,randX,randY2,this.obstacleLayer);
		}  
	}
};

Centipede.Level.prototype.constructor = Centipede.Level;
