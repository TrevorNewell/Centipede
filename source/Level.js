Centipede.Level = function (game, numObstacles) 
{
	
	this.game = game;
	this.numObstacles = numObstacles;

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
		this.obstacleLayer = this.map.create('obstacleLayer', 22, 28, 32, 32);
		this.map.setCollision([0,1,2,3,4], true, this.layer);

		var i;
		var j;

		for (i = 0; i < Centipede.gridsizeX; i++) 
		{ 
    		for (j = 0; j < Centipede.gridsizeY; j++)
    		{

    			if((j == 16 || j == 12) && (i != 0) && (i != 1) && (i != 20) && (i != 21))
    			{
    				var t = this.map.putTile(0,i,j,this.obstacleLayer);
					t.rotation = this.game.rnd.integerInRange(0,359);
    			}

    			if (i==1 || i==20)
				{
    				var t = this.map.putTile(4,i,j,this.obstacleLayer);
					t.rotation = this.game.rnd.integerInRange(0,359);
    			}
    			if (j==1 || j==26)
				{
    				var t = this.map.putTile(4,i,j,this.obstacleLayer);
					t.rotation = this.game.rnd.integerInRange(0,359);
				}
    		}
    	}
	
	},

	placeAt : function (x, y)
	{
		console.log(x + " " + y);
		var t = this.map.putTile(0,x,y,this.obstacleLayer);
		t.rotation = this.game.rnd.integerInRange(0,359);
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
			var randX = this.game.rnd.integerInRange(2,19);
			var randY1 = this.game.rnd.integerInRange(2,11);
			var randY2 = this.game.rnd.integerInRange(17,25);
			var t1 = this.map.putTile(0,randX,randY1,this.obstacleLayer);
			var t2 = this.map.putTile(0,randX,randY2,this.obstacleLayer);

			t1.rotation = this.game.rnd.integerInRange(0,359);
			t2.rotation = this.game.rnd.integerInRange(0,359);

		}  
	}
};

Centipede.Level.prototype.constructor = Centipede.Level;
