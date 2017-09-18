Centipede.Game = function (game) {

	this.boundary = null;

	this.player = null;

	//  Our controls
    this.movement = null;

};

Centipede.Game.prototype = {

	create: function () {
		this.movement = this.input.keyboard.createCursorKeys();
	    
	    //Initializes a Phaser Physics World with Arcade Physics
	    this.physics.startSystem(Phaser.Physics.ARCADE);

		//Creates the "Boundary"
		this.boundary = new Centipede.Boundary(this.game);
		this.boundary.initialize();

		this.player = new Centipede.Player(this.game, this.movement);
		this.player.initialize();

		console.log(Centipede.clampSize);
	},

	update: function () {
        
        this.player.update();
	}
};


