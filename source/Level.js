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
		this.obstacleLayer = this.map.create('obstacleLayer', 22, 22, 32, 32);
		this.map.setCollision([0,1,2,3], true, this.layer);

		var i;
		var j;

		for (i = 0; i < Centipede.gridsizeX; i++) 
		{ 
    		for (j = 0; j < Centipede.gridsizeY; j++)
    		{
    			if (i==0 || i==21)
    				this.map.putTile(0,i,j,this.obstacleLayer);
    			
    			if (j==0 || j==21)
    				this.map.putTile(0,i,j,this.obstacleLayer);
    		}
    	}
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
			var randX = this.game.rnd.integerInRange(2,21);
			var randY1 = this.game.rnd.integerInRange(2,8);
			var randY2 = this.game.rnd.integerInRange(13,21);
			this.map.putTile(0,randX,randY1,this.obstacleLayer);
			this.map.putTile(0,randX,randY2,this.obstacleLayer);
		}  
	}
};

Centipede.Level.prototype.constructor = Centipede.Level;
