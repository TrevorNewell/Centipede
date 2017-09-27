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
	this.centipedes = null;
};
	
CentipedeGroup = function (x, y, game, level, levelLayout, numSections, player)
{
	Phaser.Group.call(this, game, null);
	
	for (i = 0; i < numSections; i++)
	{
		if (i <=0)
		{
			//this.enemyHead = new Centipede.Enemy(48+32+32+32+32, 48, this.game, this.level.returnLevel(), this.level.returnLevelLayout(), 0);
			var b = new Centipede.Enemy(x, y, game, level, levelLayout, player, 0);
			b.initialize();
			
			this.add(b);
		}
		
		else if (i >= numSections - 1)
		{
			var b = new Centipede.Enemy(x-(32*i), y, game, level, levelLayout, player, 2);
			b.initialize();
			
			this.add(b);
		}
		else
		{
			var b = new Centipede.Enemy(x-(32*i), y, game, level, levelLayout, player, 1);
			b.initialize();
			
			this.add(b);
		}
	}
	
	//return this;
};

CentipedeGroup.prototype = Object.create(Phaser.Group.prototype);
CentipedeGroup.prototype.constructor = CentipedeGroup;
	
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

		this.centipedes = new CentipedeGroup(48+32+32+32+32, 48, this.game, this.level.returnLevel(), this.level.returnLevelLayout(), this.player.returnPlayer(), 8);
		console.log(this.centipedes.length);
		
		/*this.enemyHead = new Centipede.Enemy(48+32+32+32+32, 48, this.game, this.level.returnLevel(), this.level.returnLevelLayout(), 0);
>>>>>>> feature/centipede-movement
		this.enemyHead.initialize();

		this.enemyBody1 = new Centipede.Enemy(48+32+32+32, 48, this.game, this.level.returnLevel(), this.level.returnLevelLayout(), this.player.returnPlayer(), 1);
		this.enemyBody1.initialize();

		this.enemyBody2 = new Centipede.Enemy(48+32+32, 48, this.game, this.level.returnLevel(), this.level.returnLevelLayout(), this.player.returnPlayer(), 1);
		this.enemyBody2.initialize();

		this.enemyBody3 = new Centipede.Enemy(48+32, 48, this.game, this.level.returnLevel(), this.level.returnLevelLayout(), this.player.returnPlayer(), 2);
		this.enemyBody3.initialize();

		this.enemyBody4 = new Centipede.Enemy(48, 48, this.game, this.level.returnLevel(), this.level.returnLevelLayout(), this.player.returnPlayer(), 1);
		this.enemyBody4.initialize();
		*/
	},

	update: function () 
	{    
        this.player.update();
        this.bullets.update();
        this.spider.update();
        this.score.update();
		for (i = 0; i < this.centipedes.length; i++) 
		{
			this.centipedes.getAt(i).update();
		}
		/*
        this.enemyHead.update();
        this.enemyBody1.update();
        this.enemyBody2.update();
        this.enemyBody3.update();
        this.enemyBody4.update();
		*/
	}

	// render: function ()
	// {
	// 	this.enemyHead.render();
	// }

};


