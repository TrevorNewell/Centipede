Centipede.Obstacle = function (game, numObstacles, player) {
	
	this.game = game;
	this.numObstacles = numObstacles;

	this.obstacles = this.game.add.group();
	
	// Enables physics for everything in our obstacles group
	this.obstacles.enableBody = true; 
	this.obstacles.physicBodyType = Phaser.Physics.ARCADE;

	this.player = player;

	return this;
}

Centipede.Obstacle.prototype = {

	initialize: function () {
		
		// Make and place numObstacles number of obstacles in our safe zone.  Safe zone being the area below the score at the top and above where our player can move.
		for (var i = 0; i < this.numObstacles; i++)
		{
			var randX = this.game.world.randomX;
			var randY = Math.random() * Centipede.spawnZoneHeight;
			
			randX = randX - (randX%Centipede.clampSize);
			randY = randY - (randY%Centipede.clampSize);
			
			if (randY < Centipede.clampSize*2)
				randY = Centipede.clampSize*2; // This prevents mushrooms from being spawned in the top 2 rows
		    
		    var obstacle = this.obstacles.create(randX, randY, 'obstacle')
			
			obstacle.body.immovable = true;
			
			obstacle.scale.setTo(Centipede.scale, Centipede.scale);
		}

	},

	returnObstaclePositions : function () {	

		return this.obstacles;
	}

};

Centipede.Obstacle.prototype.constructor = Centipede.Obstacle;
