Centipede.Game = function (game) 
{

	this.player = null;

	this.numObstacles = 30;

    this.movement = null;       
    this.fire = null;
    
    this.maxBullets = 1;

    this.level = null;
    this.boundary = null;
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

		this.level = new Centipede.Level(this.game, this.numObstacles);
		this.level.initialize();
		this.level.randomizeMap();

		// Creates the "Boundary"
		this.boundary = new Centipede.Boundary(this.game);
		this.boundary.initialize();

		this.score = new Centipede.Score(this.game);
		this.score.initialize();

		this.player = new Centipede.Player(this.game, this.movement, this.level.returnLevel(), this.level.returnLevelLayout(), this.boundary.returnBoundary());
		this.player.initialize();

		this.bullets = new Centipede.Bullet(this.game, this.fire, this.level.returnLevel(), this.level.returnLevelLayout(), this.player.returnPlayer(), this.maxBullets, this.score);
		this.bullets.initialize();

		this.spider = new Centipede.Spider(this.game, this.player.returnPlayer(), this.obstacles, this.bullets.returnBullets(), this.score);
		this.spider.initialize();

		
		this.enemyHead = new Centipede.Enemy(48+32+32+32+32, 48, this.game, this.level.returnLevel(), this.level.returnLevelLayout(), this.player.returnPlayer(), 0);
		this.enemyHead.initialize();

		this.enemyBody1 = new Centipede.Enemy(48+32+32+32, 48, this.game, this.level.returnLevel(), this.level.returnLevelLayout(), this.player.returnPlayer(), 1);
		this.enemyBody1.initialize();

		this.enemyBody2 = new Centipede.Enemy(48+32+32, 48, this.game, this.level.returnLevel(), this.level.returnLevelLayout(), this.player.returnPlayer(), 1);
		this.enemyBody2.initialize();

		this.enemyBody3 = new Centipede.Enemy(48+32, 48, this.game, this.level.returnLevel(), this.level.returnLevelLayout(), this.player.returnPlayer(), 2);
		this.enemyBody3.initialize();

		this.enemyBody4 = new Centipede.Enemy(48, 48, this.game, this.level.returnLevel(), this.level.returnLevelLayout(), this.player.returnPlayer(), 1);
		this.enemyBody4.initialize();

	},

	update: function () 
	{    
        this.player.update();
        this.bullets.update();
        this.spider.update();
        this.score.update();
        this.enemyHead.update();
        this.enemyBody1.update();
        this.enemyBody2.update();
        this.enemyBody3.update();
        this.enemyBody4.update();
	}

	// render: function ()
	// {
	// 	this.enemyHead.render();
	// }

};


