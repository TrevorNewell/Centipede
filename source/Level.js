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
				{
    				var t = this.map.putTile(0,i,j,this.obstacleLayer);
					t.rotation = this.game.rnd.integerInRange(0,359);
    			}
    			if (j==0 || j==21)
				{
    				var t = this.map.putTile(0,i,j,this.obstacleLayer);
					t.rotation = this.game.rnd.integerInRange(0,359);
				}
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
			var randY = this.game.rnd.integerInRange(2,19)
			var t = this.map.putTile(0,randX,randY,this.obstacleLayer);
			t.rotation = this.game.rnd.integerInRange(0,359);
		}  
	}
};

Centipede.Level.prototype.constructor = Centipede.Level;
