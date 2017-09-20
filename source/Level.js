Centipede.Level = function (game) {
	
	this.game = game;
	// this.numObstacles = numObstacles;
	// this.player = player;

	this.map = null;
	this.obstacleLayer = null;
	

	return this;
}

Centipede.Level.prototype = {

	initialize: function () {
		
		this.map = this.game.add.tilemap('map',32,32);
		this.map.addTilesetImage('obstacle');
		this.obstacleLayer = this.map.create('obstacleLayer', 20, 20, 32, 32)
		//this.obstacleLayer = this.map.create('obstacleLayer', 20, 20, 32, 32)
		this.obstacleLayer.resizeWorld();
	},

	returnLevel : function () {	

		return this.map;
	}

};

Centipede.Level.prototype.constructor = Centipede.Level;
