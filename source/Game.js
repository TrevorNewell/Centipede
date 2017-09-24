Centipede.Game = function (game) 
{

	this.player = null;

	this.numObstacles = 30;

    this.movement = null;       
    this.fire = null;
    
    this.maxBullets = 1;

    this.level = null;
    this.score = null;

    this.spider = null;
};

Centipede.Game.prototype = 
{

	create: function () 
	{
		this.movement = this.input.keyboard.createCursorKeys();
		this.fire = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	    
	    //Initializes a Phaser Physics World with Arcade Physics
	    this.physics.startSystem(Phaser.Physics.ARCADE);

		// //Creates the "Boundary"
		// this.boundary = new Centipede.Boundary(this.game);
		// this.boundary.initialize();

		this.level = new Centipede.Level(this.game, this.numObstacles);
		this.level.initialize();
		this.level.randomizeMap();

		this.score = new Centipede.Score(this.game);
		this.score.initialize();

		this.player = new Centipede.Player(this.game, this.movement, this.level.returnLevel(), this.level.returnLevelLayout());
		this.player.initialize();

		this.bullets = new Centipede.Bullet(this.game, this.fire, this.level.returnLevel(), this.level.returnLevelLayout(), this.player.returnPlayer(), this.maxBullets, this.score);
		this.bullets.initialize();

		this.spider = new Centipede.Spider(this.game, this.player.returnPlayer(), this.obstacles, this.bullets.returnBullets(), this.score);
		this.spider.initialize();

	},

	update: function () 
	{    
        this.player.update();
        this.bullets.update();
        this.spider.update();
        this.score.update();
	}
};


