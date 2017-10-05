Centipede.Game = function (game) 
{
	this.player = null;

	this.numObstacles = 15;

    this.movement = null;       
    this.fire = null;
    this.restart = null;
    
    this.maxBullets = 1;

    this.level = null;
    this.boundary = null;
    this.score = null;

	this.sound = null;
	
    this.spider = null;
	this.centipedes = null;

	this.homingSection = null;
	
	this.bullets = null;

	this.respawnCentipedes = 0;

	this.background = null;

};
	
Centipede.CentipedeGroup = function (x, y, game, bullets, t, level, levelLayout, player, numSections, score, goalDirection, spawn, homingSection)
{
	Phaser.Group.call(this, game, null);
	
	Centipede.count = numSections;
	
	for (i = 0; i < numSections; i++)
	{
		if (i == 0)
		{
			var b = new Centipede.Enemy(x, y, game, bullets, t, level, levelLayout, player, 0, score, goalDirection, homingSection);
			b.initialize();
			
			this.add(b);
		}
		else if (i >= numSections - 1 && spawn)
		{
			if (goalDirection == Phaser.DOWN)
			{
				var b = new Centipede.Enemy(x+(32*i), y, game, bullets, t, level, levelLayout, player, 3, score, goalDirection, homingSection);

				b.initialize();

				this.add(b);
			}				
			else if (goalDirection == Phaser.UP)
			{
				var b = new Centipede.Enemy(x-(32*i), y, game, bullets, t, level, levelLayout, player, 2, score, goalDirection, homingSection);

				b.initialize();
			
				this.add(b);
			}
		}
		else
		{
			if (goalDirection == Phaser.DOWN)
			{
				var b = new Centipede.Enemy(x+(32*i), y, game, bullets, t, level, levelLayout, player, 1, score, goalDirection, homingSection);

				b.initialize();

				this.add(b);
			}				
			else if (goalDirection == Phaser.UP)
			{
				var b = new Centipede.Enemy(x-(32*i), y, game, bullets, t, level, levelLayout, player, 1, score, goalDirection, homingSection);

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
	spawnNewCentipede: function (x, y, player, numSections, goalDirection, spawn, homingSection)
	{
		Centipede.OurSound.playCentipedeSpawn();
		
		Centipede.count = Centipede.count + numSections;
		for (i = 0; i < numSections; i++)
		{
			if (i == 0)
			{
				var b = new Centipede.Enemy(x, y, this.game, this.bullets.returnBullets(), this.level, this.level.returnLevel(), this.level.returnLevelLayout(), player, 0, this.score, goalDirection, homingSection);

				b.initialize();
								
				this.centipedes.add(b);
			}
			else if (i >= numSections - 1 && spawn)
			{
				if (goalDirection == Phaser.DOWN)
				{
					var b = new Centipede.Enemy(x+(32*i), y, this.game, this.bullets.returnBullets(), this.level, this.level.returnLevel(), this.level.returnLevelLayout(), player, 3, this.score, goalDirection, homingSection);

					b.initialize();

					this.centipedes.add(b);
				}				
				else if (goalDirection == Phaser.UP)
				{
					var b = new Centipede.Enemy(x-(32*i), y, this.game, this.bullets.returnBullets(), this.level, this.level.returnLevel(), this.level.returnLevelLayout(), player, 2, this.score, goalDirection, homingSection);

					b.initialize();
				
					this.centipedes.add(b);
				}
			}
			else
			{
				if (goalDirection == Phaser.DOWN)
				{
					var b = new Centipede.Enemy(x+(32*i), y, this.game, this.bullets.returnBullets(), this.level, this.level.returnLevel(), this.level.returnLevelLayout(), player, 1, this.score, goalDirection, homingSection);

					b.initialize();

					this.centipedes.add(b);
				}				
				else if (goalDirection == Phaser.UP)
				{
					var b = new Centipede.Enemy(x-(32*i), y, this.game, this.bullets.returnBullets(),this.level, this.level.returnLevel(), this.level.returnLevelLayout(), player, 1, this.score, goalDirection, homingSection);
					
					b.initialize();
				
					this.centipedes.add(b);
				}
				else console.log("NO DIRECTION.");	
			}
		}
	},
	
	create: function () 
	{
		this.background = this.add.tileSprite(0, 0, 704, 894, "background");

		this.sound = new Centipede.Sound(this.game);
		this.sound.initialize();
		
		Centipede.OurSound = this.sound;
		
		this.movement = this.input.keyboard.createCursorKeys();
		this.fire = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		this.restart = this.game.input.keyboard.addKey(Phaser.Keyboard.R);

	    this.physics.startSystem(Phaser.Physics.ARCADE);
		
		this.level = new Centipede.Level(this.game, this.numObstacles);
		this.level.initialize();
		this.level.randomizeMap();

		this.boundary = new Centipede.Boundary(this.game);
		this.boundary.initialize();
		
		this.player = new Centipede.Player(this.game, this.movement, this.level.returnLevel(), this.level.returnLevelLayout(), this.boundary.returnBoundary());
		this.player.initialize();

		this.score = new Centipede.Score(this.game);
		this.score.initialize();

		this.bullets = new Centipede.Bullet(this.game, this.fire, this.level.returnLevel(), this.level.returnLevelLayout(), this.player.returnPlayer(), this.maxBullets, this.score);
		this.bullets.initialize();
		
		this.homingSection = new Centipede.HomingSection(this.game, this.player, this.level, this.level.returnLevel(), this.level.returnLevelLayout(), this.bullets.returnBullets());
		this.homingSection.initialize();

		this.centipedes = new Centipede.CentipedeGroup(-48, 768-48+64, this.game, this.bullets.returnBullets(), this.level, this.level.returnLevel(), this.level.returnLevelLayout(), this.player, 8, this.score, Phaser.UP, true, this.homingSection);
		this.spawnNewCentipede(704+48, 80+32, this.player, 8, Phaser.DOWN, true, this.homingSection);
	},

	update: function () 
	{    
        this.respawnCentipedes = this.player.update();
        this.bullets.update();
        this.score.update();
        this.homingSection.update();

		for (i = 0; i < this.centipedes.length; i++) 
		{
			this.centipedes.getAt(i).update();
		}

		if (this.respawnCentipedes==1)
		{
			for (i = 0; i < this.centipedes.length; i++) 
			{
				this.centipedes.getAt(i).killSectionManually();
			}
			this.player.respawn = 0;
			Centipede.count = 0;
		}
		
		if (Centipede.count <= 0)
		{
			this.spawnNewCentipede(-48, 768-48+64, this.player, 8, Phaser.UP, true, this.homingSection);
			this.spawnNewCentipede(704+48, 80+32, this.player, 8, Phaser.DOWN, true, this.homingSection);
		}

		if(this.restart.isDown)
			this.state.start('Game');
	},
	
	// render: function ()
	// {
	// 	for (i = 0; i < this.centipedes.length; i++) 
	// 	{
	// 		this.centipedes.getAt(i).render();
	// 	}
	// }
};


