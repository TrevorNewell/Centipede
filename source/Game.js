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
	this.centipedes = null;
};
	
Centipede.CentipedeGroup = function (x, y, game, level, levelLayout, numSections, goalDirection)
{
	Phaser.Group.call(this, game, null);
	
	console.log(goalDirection);
	
	for (i = 0; i < numSections; i++)
	{
		if (i <= 0)
		{
			//this.enemyHead = new Centipede.Enemy(48+32+32+32+32, 48, this.game, this.level.returnLevel(), this.level.returnLevelLayout(), 0);
			var b = new Centipede.Enemy(x, y, game, level, levelLayout, 0, goalDirection);
			b.initialize();
			
			this.add(b);
		}
		else
		{
			if (goalDirection == Phaser.DOWN)
			{
				var b = new Centipede.Enemy(x-(32*i), y, game, level, levelLayout, 1, goalDirection);
				b.initialize();
			
				this.add(b);
			}				
			else if (goalDirection == Phaser.UP)
			{
				var b = new Centipede.Enemy(x+(32*i), y, game, level, levelLayout, 1, goalDirection);
				b.initialize();
			
				this.add(b);
			}
			else console.log("NO DIRECTION.");	
		}
	}
	
	return this;
};

Centipede.CentipedeGroup.prototype = Object.create(Phaser.Group.prototype);
Centipede.CentipedeGroup.prototype.constructor = Centipede.CentipedeGroup;
	
Centipede.Game.prototype = 
{	
	spawnNewCentipede: function (x, y, numSections, goalDirection)
	{
		for (i = 0; i < numSections; i++)
		{
			if (i <= 0)
			{
				//this.enemyHead = new Centipede.Enemy(48+32+32+32+32, 48, this.game, this.level.returnLevel(), this.level.returnLevelLayout(), 0);
				var b = new Centipede.Enemy(x, y, this.game, this.level.returnLevel(), this.level.returnLevelLayout(), 0, goalDirection);
				b.initialize();
				
				this.centipedes.add(b);
			}
			else
			{
				if (goalDirection == Phaser.DOWN)
				{
					var b = new Centipede.Enemy(x-(32*i), y, this.game, this.level.returnLevel(), this.level.returnLevelLayout(), 1, goalDirection);
					b.initialize();
				
					this.centipedes.add(b);
				}				
				else if (goalDirection == Phaser.UP)
				{
					var b = new Centipede.Enemy(x+(32*i), y, this.game, this.level.returnLevel(), this.level.returnLevelLayout(), 1, goalDirection);
					b.initialize();
				
					this.centipedes.add(b);
				}
				else console.log("NO DIRECTION.");	
			}
		}
	},
	
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

		this.spider = new Centipede.Spider(this.game, this.player.returnPlayer(), this.obstacles, this.bullets.returnBullets());
		this.spider.initialize();

		this.centipedes = new Centipede.CentipedeGroup(356, 48, this.game, this.level.returnLevel(), this.level.returnLevelLayout(), 4, Phaser.DOWN);
		//this.spawnNewCentipede(356, 702-48, 4, Phaser.UP);

		console.log(this.centipedes.length);
		
		/*this.enemyHead = new Centipede.Enemy(48+32+32+32+32, 48, this.game, this.level.returnLevel(), this.level.returnLevelLayout(), 0);
		this.enemyHead.initialize();

		this.enemyBody1 = new Centipede.Enemy(48+32+32+32, 48, this.game, this.level.returnLevel(), this.level.returnLevelLayout(), 1);
		this.enemyBody1.initialize();

		this.enemyBody2 = new Centipede.Enemy(48+32+32, 48, this.game, this.level.returnLevel(), this.level.returnLevelLayout(), 1);
		this.enemyBody2.initialize();

		this.enemyBody3 = new Centipede.Enemy(48+32, 48, this.game, this.level.returnLevel(), this.level.returnLevelLayout(), 2);
		this.enemyBody3.initialize();

		this.enemyBody4 = new Centipede.Enemy(48, 48, this.game, this.level.returnLevel(), this.level.returnLevelLayout(), 1);
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


