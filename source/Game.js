Centipede.Game = function (game) {

	this.boundary = null;

	this.player = null;

	this.obstacles = null;
	this.numObstacles = 30;

	//  Our controls
    this.movement = null;

    this.fire = null;
    this.maxBullets = 1;

};

Centipede.Game.prototype = {

	create: function () {
		this.movement = this.input.keyboard.createCursorKeys();
		this.fire = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	    
	    //Initializes a Phaser Physics World with Arcade Physics
	    this.physics.startSystem(Phaser.Physics.ARCADE);

		//Creates the "Boundary"
		this.boundary = new Centipede.Boundary(this.game);
		this.boundary.initialize();

		this.obstacles = new Centipede.Obstacle(this.game, this.numObstacles);
		this.obstacles.initialize();

		this.player = new Centipede.Player(this.game, this.movement, this.obstacles.returnObstaclePositions());
		this.player.initialize();

		this.bullets = new Centipede.Bullet(this.game, this.fire, this.obstacles, this.maxBullets);
	},

	update: function () {
        
        this.player.update();
        this.bullets.update();
	}
};


