Centipede.Game = function (game) 
{

	this.player = null;

	this.numObstacles = 25;

    this.movement = null;       
    this.fire = null;
    
    this.maxBullets = 1;

    this.level = null;
    this.boundary = null;
    this.score = null;

	this.sound = null;
	
    this.spider = null;
	this.centipedes = null;
};
	
Centipede.CentipedeGroup = function (x, y, game, level, levelLayout, player, numSections, goalDirection)
{
	Phaser.Group.call(this, game, null);
	
	//console.log(goalDirection);
	
	for (i = 0; i < numSections; i++)
	{
		if (i <= 0)
		{
			//this.enemyHead = new Centipede.Enemy(48+32+32+32+32, 48, this.game, this.level.returnLevel(), this.level.returnLevelLayout(), 0);
			var b = new Centipede.Enemy(x, y, game, level, levelLayout, player, 0, goalDirection);
			b.initialize();
			
			this.add(b);
		}
		
		else if (i >= numSections - 1)
		{
			var b = new Centipede.Enemy(x-(32*i), y, game, level, levelLayout, player, 2, goalDirection);
			b.initialize();

			this.add(b);
		}
		else
		{
			if (goalDirection == Phaser.DOWN)
			{
				var b = new Centipede.Enemy(x-(32*i), y, game, level, levelLayout, player, 1, goalDirection);
				b.initialize();

				this.add(b);
			}				
			else if (goalDirection == Phaser.UP)
			{
				var b = new Centipede.Enemy(x+(32*i), y, game, level, levelLayout, player, 1, goalDirection);
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
	spawnNewCentipede: function (x, y, numSections, player, goalDirection)
	{
		for (i = 0; i < numSections; i++)
		{
			if (i <= 0)
			{
				//this.enemyHead = new Centipede.Enemy(48+32+32+32+32, 48, this.game, this.level.returnLevel(), this.level.returnLevelLayout(), 0);
				var b = new Centipede.Enemy(x, y, this.game, this.level.returnLevel(), this.level.returnLevelLayout(), this.player, 0, goalDirection);
				b.initialize();
				
				this.enemyHead = b;
				
				this.centipedes.add(b);
			}
			else
			{
				if (goalDirection == Phaser.DOWN)
				{
					var b = new Centipede.Enemy(x-(32*i), y, this.game, this.level.returnLevel(), this.level.returnLevelLayout(), this.player, 1, goalDirection);
					b.initialize();
				
					this.centipedes.add(b);
				}				
				else if (goalDirection == Phaser.UP)
				{
					var b = new Centipede.Enemy(x+(32*i), y, this.game, this.level.returnLevel(), this.level.returnLevelLayout(), this.player, 1, goalDirection);
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

		this.level = new Centipede.Level(this.game, this.numObstacles);
		this.level.initialize();
		this.level.randomizeMap();

		// Creates the "Boundary"
		this.boundary = new Centipede.Boundary(this.game);
		this.boundary.initialize();
		
		this.player = new Centipede.Player(this.game, this.movement, this.level.returnLevel(), this.level.returnLevelLayout(), this.boundary.returnBoundary());
		this.player.initialize();

		this.centipedes = new Centipede.CentipedeGroup(704+48, 704-48, this.game, this.level.returnLevel(), this.level.returnLevelLayout(), this.player, 8, Phaser.UP);
		this.spawnNewCentipede(-48, 48, 8, this.player, Phaser.DOWN);

		this.score = new Centipede.Score(this.game);
		this.score.initialize();
		
		this.sound = new Centipede.Sound(this.game);
		this.sound.initialize();

		this.bullets = new Centipede.Bullet(this.game, this.fire, this.sound, this.level.returnLevel(), this.level.returnLevelLayout(), this.player.returnPlayer(), this.maxBullets, this.score);
		this.bullets.initialize();
	},

	update: function () 
	{    
        this.player.update();
        this.bullets.update();
        this.score.update();
		for (i = 0; i < this.centipedes.length; i++) 
		{
			this.centipedes.getAt(i).update();
		}
	}

	// render: function ()
	// {
	// 	for (i = 0; i < this.centipedes.length; i++) 
	// 	{
	// 		this.centipedes.getAt(i).render();
	// 	}
	// }
};


