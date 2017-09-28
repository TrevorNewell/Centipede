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
	
	this.bullets = null;
};
	
Centipede.CentipedeGroup = function (x, y, game, bullets, t, level, levelLayout, player, numSections, goalDirection, spawn)
{
	Phaser.Group.call(this, game, null);
	
	Centipede.count = numSections;
	
	for (i = 0; i < numSections; i++)
	{
		if (i == 0)
		{
			//this.enemyHead = new Centipede.Enemy(48+32+32+32+32, 48, this.game, this.level.returnLevel(), this.level.returnLevelLayout(), 0);
			var b = new Centipede.Enemy(x, y, game, bullets, t, level, levelLayout, player, 0, goalDirection);
			b.initialize();
			
			this.add(b);
		}
		else if (i >= numSections - 1 && spawn)
		{
			if (goalDirection == Phaser.DOWN)
			{
				var b = new Centipede.Enemy(x-(32*i), y, game, bullets, t, level, levelLayout, player, 2, goalDirection);
				b.initialize();

				this.add(b);
			}				
			else if (goalDirection == Phaser.UP)
			{
				var b = new Centipede.Enemy(x+(32*i), y, game, bullets, t, level, levelLayout, player, 2, goalDirection);
				b.initialize();
			
				this.add(b);
			}
		}
		else
		{
			if (goalDirection == Phaser.DOWN)
			{
				var b = new Centipede.Enemy(x-(32*i), y, game, bullets, t, level, levelLayout, player, 1, goalDirection);
				b.initialize();

				this.add(b);
			}				
			else if (goalDirection == Phaser.UP)
			{
				var b = new Centipede.Enemy(x+(32*i), y, game, bullets, t, level, levelLayout, player, 1, goalDirection);
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
	spawnNewCentipede: function (x, y, player, numSections, goalDirection, spawn)
	{
		Centipede.count = Centipede.count + numSections;
		for (i = 0; i < numSections; i++)
		{
			if (i == 0)
			{
				//this.enemyHead = new Centipede.Enemy(48+32+32+32+32, 48, this.game, this.level.returnLevel(), this.level.returnLevelLayout(), 0);
				var b = new Centipede.Enemy(x, y, this.game, this.bullets.returnBullets(), this.level, this.level.returnLevel(), this.level.returnLevelLayout(), player, 0, goalDirection);
				b.initialize();
				
				//this.enemyHead = b;
				
				this.centipedes.add(b);
			}
			else if (i >= numSections - 1 && spawn)
			{
				if (goalDirection == Phaser.DOWN)
				{
					var b = new Centipede.Enemy(x-(32*i), y, this.game, this.bullets.returnBullets(), this.level, this.level.returnLevel(), this.level.returnLevelLayout(), player, 2, goalDirection);
					b.initialize();

					this.centipedes.add(b);
				}				
				else if (goalDirection == Phaser.UP)
				{
					var b = new Centipede.Enemy(x+(32*i), y, this.game, this.bullets.returnBullets(), this.level, this.level.returnLevel(), this.level.returnLevelLayout(), player, 2, goalDirection);
					b.initialize();
				
					this.centipedes.add(b);
				}
			}
			else
			{
				if (goalDirection == Phaser.DOWN)
				{
					var b = new Centipede.Enemy(x-(32*i), y, this.game, this.bullets.returnBullets(), this.level, this.level.returnLevel(), this.level.returnLevelLayout(), player, 1, goalDirection);
					b.initialize();

					this.centipedes.add(b);
				}				
				else if (goalDirection == Phaser.UP)
				{
					var b = new Centipede.Enemy(x+(32*i), y, this.game, this.bullets.returnBullets(),this.level, this.level.returnLevel(), this.level.returnLevelLayout(), player, 1, goalDirection);
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

		this.sound = new Centipede.Sound(this.game);
		this.sound.initialize();
		
		this.level = new Centipede.Level(this.game, this.numObstacles);
		this.level.initialize();
		this.level.randomizeMap();

		// Creates the "Boundary"
		this.boundary = new Centipede.Boundary(this.game);
		this.boundary.initialize();
		
		this.player = new Centipede.Player(this.game, this.movement, this.level.returnLevel(), this.level.returnLevelLayout(), this.boundary.returnBoundary());
		this.player.initialize();

		this.score = new Centipede.Score(this.game);
		this.score.initialize();

		this.bullets = new Centipede.Bullet(this.game, this.fire, this.sound, this.level.returnLevel(), this.level.returnLevelLayout(), this.player.returnPlayer(), this.maxBullets, this.score);
		this.bullets.initialize();
		
		this.centipedes = new Centipede.CentipedeGroup(704+48, 704-48, this.game, this.bullets.returnBullets(), this.level, this.level.returnLevel(), this.level.returnLevelLayout(), this.player, 8, Phaser.UP, true, this.score);
		this.spawnNewCentipede(-48, 48, this.player, 8, Phaser.DOWN, false);
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
		
		if (Centipede.count == 0)
		{
			this.spawnNewCentipede(704+48, 704-48, this.player, 8, Phaser.UP, true);
			this.spawnNewCentipede(-48, 48, this.player, 8, Phaser.DOWN, true);
		}
		
		console.log(Centipede.count);
	},
	
	// render: function ()
	// {
	// 	for (i = 0; i < this.centipedes.length; i++) 
	// 	{
	// 		this.centipedes.getAt(i).render();
	// 	}
	// }
};


