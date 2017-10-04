Centipede.Enemy = function (x, y, game, bullets, level, map, layout, playerObject, type, score, goalDirection, homingSection) 
{
	this.x = x;
	this.y = y;
		
	this.type = type;
	this.playerObject = playerObject;
	this.player = this.playerObject.returnPlayer();
	this.homingSection = homingSection;
	
	this.game = game;
	this.level = level;
	this.map = map;
	this.layout = layout;
	
	this.bullets = bullets;
	
	this.enemy = null;
	this.turret = null;
	this.weapon = null;
	
    this.speed = 250;

    this.marker = new Phaser.Point();
    this.turnPoint = new Phaser.Point();
    this.directions = [ null, null, null, null, null ];

    this.gridsize = 32;
    this.threshold = 5;

    this.walk = null; 

    this.score = score;

	this.hasBeenKilled = false;
	
	this.goalDirection = goalDirection;
	
	if (this.goalDirection == Phaser.DOWN)
	{
		this.direction = Phaser.LEFT;
		this.prevDirection = this.direction;
	}
	else if (this.goalDirection == Phaser.UP)
	{
		this.direction = Phaser.RIGHT;
		this.prevDirection = this.direction;
	}
	else
	{
		console.log("Invalid goalDirection: " + this.goalDirection);
	}
	
	this.hasEntered = false;

	this.disableTimer = null;

	this.aggresive = false;
	
	this.explosion = null;
	
	return this;
};

Centipede.Enemy.prototype = 
{
	initialize: function () {

		if (this.type == 0) // Head of Centipede
		{
			this.enemy = this.game.add.sprite(this.x, this.y, 'enemyBlue');

    		this.walk = this.enemy.animations.add('walk');

    		this.enemy.animations.play('walk', 30, true);
    	}		
		else  if (this.type == 1) // Regular section
		{
			var rand = this.game.rnd.integerInRange(0,3);

			if (rand == 0)
				this.enemy = this.game.add.sprite(this.x, this.y, 'enemy1');
			
			else if (rand==1)
				this.enemy = this.game.add.sprite(this.x, this.y, 'enemy2');

			else if (rand==2)
				this.enemy = this.game.add.sprite(this.x, this.y, 'enemy3');
			
			else
				this.enemy = this.game.add.sprite(this.x, this.y, 'enemy4');

    		this.walk = this.enemy.animations.add('walk');

    		this.enemy.animations.play('walk', 30, true);
		}
		else if (this.type == 2) // Sentry section
		{
			this.enemy = this.game.add.sprite(this.x, this.y, 'enemyTurretHull');
			
			this.turret = this.enemy.addChild(this.game.make.sprite(8, 0, 'enemyTurret'));

			this.turret.scale.setTo(0.9,0.9);
			this.turret.anchor.set(0.25, 0.5);
			

		    this.weapon = this.game.add.weapon(1, 'bulletOrange');

		     //  The bullet will be automatically killed when it leaves the world bounds
	        this.weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;

	        //  Because our bullet is drawn facing up, we need to offset its rotation:
	        this.weapon.bulletAngleOffset = 90;

	        //Scaling the bullet size
	        this.weapon.bullets.forEach((bullet) => {
			  bullet.body.updateBounds(); //To avoid scaling bug with physics
			  }, this);

			this.weapon.fireRate = 10; // Measured in milliseconds.
			
	        //  The speed at which the bullet is fired
	        this.weapon.bulletSpeed = 200;

	        //  Tell the Weapon to track the 'turret' Sprite
	        this.weapon.trackSprite(this.turret, 15, 0, true);
			
			this.weapon.onFire = new Phaser.Signal();
			this.weapon.onFire.add(Centipede.OurSound.playCentipedeShoot, Centipede.OurSound);

			this.weapon.onKill = new Phaser.Signal();
			this.weapon.onKill.add(this.playEnemyBulletExplode, this);
		
			this.weapon.fireLimit = 1;
		}
		else if (this.type == 3) // Homing section
		{
			this.enemy = this.game.add.sprite(this.x, this.y, 'enemyRed');
		}	
		else
		{
			console.log("Invalid type: " + type);
		}
		
		// The player and its settings
    	this.enemy.anchor.set(0.5,0.5);

		this.enemy.scale.setTo(1,1);
		
		//  We need to enable physics on the player
    	this.game.physics.arcade.enable(this.enemy);

		this.enemy.body.setSize(24, 24, 4, 4);
		
		// Create a custom timer
		this.disableTimer = this.game.time.create(false);
		this.enableTimer = this.game.time.create(false);
			
		var timerEvent;

		// Create a delayed event 10s from now
		timerEvent = this.disableTimer.add(Phaser.Timer.SECOND * 5, this.enableTurret, this);
			
		// Start the timer
		this.disableTimer.start(false);

		this.enemy.checkWorldBounds = true;
		this.enemy.events.onOutOfBounds.add(this.centipedeOutOfBounds, this);
    	//this.enemy.body.collideWorldBounds = true;
		
		// Setup the explosion for this object.
		this.enemy.onKilled = new Phaser.Signal();
		this.enemy.events.onKilled.add(this.playExplode, this);
	},
	
	centipedeOutOfBounds : function ()
	{
		if (this.hasEntered)
		{
			Centipede.count--;

			this.enemy.kill();
		}
	},

	update: function () 
	{	
		if (this.enemy.alive) this.game.physics.arcade.collide(this.player, this.enemy, this.centipedeKillPlayer, null, this); // Disabled rn.  Player dies repeatedly in same spot.
		if (this.enemy.alive) this.game.physics.arcade.collide(this.bullets, this.enemy, this.killSection, null, this);
        
        //  Update our grid sensors
        this.directions[1] = this.map.getTileLeft(this.layout.index, this.marker.x, this.marker.y);
        this.directions[2] = this.map.getTileRight(this.layout.index, this.marker.x, this.marker.y);
        this.directions[3] = this.map.getTileAbove(this.layout.index, this.marker.x, this.marker.y);
        this.directions[4] = this.map.getTileBelow(this.layout.index, this.marker.x, this.marker.y);
		
		if (this.hasEntered)
		{
			this.marker.x = this.game.math.snapToFloor(Math.floor(this.enemy.x), this.gridsize) / this.gridsize;
        	this.marker.y = this.game.math.snapToFloor(Math.floor(this.enemy.y), this.gridsize) / this.gridsize;

			if (this.goalDirection == Phaser.DOWN)
			{
        		if (this.marker.y == 11)
        			this.aggresive = true;

        		else 
        			this.aggresive = false;
				
				if(this.direction != Phaser.DOWN)	
				{
					if (this.marker.y > this.game.rnd.integerInRange(22,25))
        				this.goalDirection = Phaser.UP;

					if(this.goalDirection == Phaser.DOWN)
					{
						if(this.aggresive)
						{
							this.game.physics.arcade.overlap(this.enemy, this.layout, this.changeLaneAggresively, null, this);
						}
						else
						{	
							this.game.physics.arcade.collide(this.enemy, this.layout, this.changeLane, null, this);
						}
					}
				}
				else 
				{
					if(this.goalDirection == Phaser.DOWN)
					{		
						this.game.physics.arcade.overlap(this.enemy, this.layout, this.turn, null, this);
					}
				}
			}
			else if (this.goalDirection == Phaser.UP)
			{				
        		if (this.marker.y == 17)
        			this.aggresive = true;

        		else
        			this.aggresive = false;

				if(this.direction != Phaser.UP)	
				{
					if (this.marker.y < this.game.rnd.integerInRange(3,6))
        				this.goalDirection = Phaser.DOWN;

					if(this.goalDirection == Phaser.UP)
					{
						if(this.aggresive)
						{
							this.game.physics.arcade.overlap(this.enemy, this.layout, this.changeLaneUpAggresively, null, this);
						}
						else
						{
							this.game.physics.arcade.collide(this.enemy, this.layout, this.changeLaneUp, null, this);
						}
					}
				}
				else 
				{	
					if(this.goalDirection == Phaser.UP)
					{	
						this.game.physics.arcade.overlap(this.enemy, this.layout, this.turnUp, null, this);
					}
				}
			}
		}

		//Code for turret to track player
		if (this.type == 2 && this.enemy.alive)
		{
			if (this.direction == Phaser.LEFT)
				this.turret.rotation = this.game.physics.arcade.angleBetween(this.enemy, this.player) + 3.14;
			else if (this.direction == Phaser.UP)
				this.turret.rotation = this.game.physics.arcade.angleBetween(this.enemy, this.player) + 1.57;
			else if (this.direction == Phaser.DOWN)
				this.turret.rotation = this.game.physics.arcade.angleBetween(this.enemy, this.player) - 1.57;
			else
				this.turret.rotation = this.game.physics.arcade.angleBetween(this.enemy, this.player);

			if(this.player.alive == true)
				this.weapon.fireAtSprite(this.player);
			
			// Doing it this way, allows us to kill just the bullet that collided with the player.  Which we need to be able to do if we decide to be able to shoot more than one bullet at a time.
			this.game.physics.arcade.collide(this.weapon.bullets, this.layout, this.damageObstacle, null, this);
			
			if (this.game.physics.arcade.collide(this.weapon.bullets, this.player))
			{
				this.playerObject.killPlayer();
				this.weapon.forEach(function(bullet){bullet.kill();});
			}	
		}
		
		//Code for collison between Homing section and centipede section
		if(this.homingSection.isAlive == true){

			this.game.physics.arcade.collide(this.homingSection.missile, this.enemy, this.enemyCollision, null, this);
		}

		this.move();
	},

	playEnemyBulletExplode : function(bullet)
	{
		var explodeAnim = this.game.add.sprite(bullet.x, bullet.y, 'explosionRed');
		explodeAnim.anchor.set(0.5);
		explodeAnim.scale.setTo(0.4,0.4);
		explodeAnim.rotation = this.game.rnd.integerInRange(0,359);
		explodeAnim.animations.add('explode');
		explodeAnim.animations.play('explode', 20, false, true);
	},
	
	playExplode : function()
	{
		if (!this.hasBeenKilled)
		{
			var explodeAnim = this.game.add.sprite(this.enemy.x, this.enemy.y, 'explosionRed');
			explodeAnim.anchor.set(0.5);
			explodeAnim.scale.setTo(1.2,1.2);
			explodeAnim.rotation = this.game.rnd.integerInRange(0,359);
			explodeAnim.animations.add('explode');
			explodeAnim.animations.play('explode', 20, false, true);
		}
		
		this.hasBeenKilled = true;
	},
	
	enemyCollision : function (missile, centipede)
	{

		this.homingSection.explosionTimer.stop(true);

		Centipede.OurSound.playCentipedeDeath();
		
		Centipede.count--;
		console.log("Killing that <insert politically correct term here>");

		this.score.createScoreAnimation(missile.x, missile.y, "+50", 50);

		// Spawn Wreckage at the centipedes current tile.
		var x  = this.game.math.snapToFloor(Math.floor(centipede.x), this.gridsize) / this.gridsize;
        var y = this.game.math.snapToFloor(Math.floor(centipede.y), this.gridsize) / this.gridsize;
		this.level.placeAt(x, y);

		centipede.kill();
		missile.kill();
		this.homingSection.isAlive = false;
        this.homingSection.getExplosion(missile.x, missile.y);

	},

	damageObstacle : function (bullet, tile)
    {

        bullet.kill();

        var posX = tile.x;
        var posY = tile.y;
        var index = tile.index
        var layer = tile.layer

        tile.destroy();

		if (index == 4)
		{	
			return;
		}

		tile.destroy();

		if (index <= 3)
			this.map.putTile(5,posX,posY,this.layer);
    },

    enableTurret : function ()
    {
    	if(this.type != 2)
    		return;

  		this.disableTimer.stop();

		var timerEvent;	
			
		// Create a delayed event 10s from now
		timerEvent = this.disableTimer.add(Phaser.Timer.SECOND * 5, this.enableTurret, this);	

		this.weapon.resetShots();
	
		this.disableTimer.start();

    },

	killSection : function(centipede, bullet)
	{
		Centipede.OurSound.playCentipedeDeath();
		
		Centipede.count--;

		this.score.createScoreAnimation(bullet.x, bullet.y, "+50", 50);
		
		bullet.kill();
		
		// Spawn Wreckage at the centipedes current tile.
		var x  = this.game.math.snapToFloor(Math.floor(centipede.x), this.gridsize) / this.gridsize;
        var y = this.game.math.snapToFloor(Math.floor(centipede.y), this.gridsize) / this.gridsize;
		
		if (this.type == 3)
			this.homingSection.launchMissile(centipede.x, centipede.y);
		
		else
			this.level.placeAt(x, y);
		
		centipede.kill();
	},

	killSectionManually : function() //This is called from Game to Kill a Centipede
	{	
		Centipede.count--;
		this.enemy.kill();
	},
	
	centipedeKillPlayer : function (player, enemy)
	{
		Centipede.count--;
				
		enemy.kill();
		
		if (enemy.type == 2) this.turret.alive = false;
		
		// Kill Player
		this.playerObject.killPlayer();
	},
	
	turretKillPlayer : function (bullet, player)
	{
		bullet.kill();
		this.playerObject.killPlayer();
	},
	
	returnEnemy : function()
	{
		return this.enemy;
	},

	changeLaneUp : function()
	{
		if ((this.directions[2].index >= 0) && this.direction === Phaser.RIGHT)
		{
			if(this.directions[3].index >= 0 && this.directions[3].index != 5)
			{
				this.direction = Phaser.LEFT;
				return;
			}

			this.prevDirection = this.direction;
			this.direction = Phaser.UP;	

			this.turnPoint.x = (this.marker.x * this.gridsize) + (this.gridsize / 2);
       		this.turnPoint.y = ((this.marker.y) * this.gridsize) - (this.gridsize / 2);
		}

		else if (this.directions[1].index >= 0 && this.direction === Phaser.LEFT)
		{
			if(this.directions[3].index >= 0 && this.directions[3].index != 5)
			{
				this.direction = Phaser.RIGHT;
				return;
			}

			this.prevDirection = this.direction;
			this.direction = Phaser.UP;

			this.turnPoint.x = (this.marker.x * this.gridsize) + (this.gridsize / 2);
       		this.turnPoint.y = ((this.marker.y) * this.gridsize) - (this.gridsize / 2);
		}
	},

	changeLaneUpAggresively : function()
	{
		if(this.directions[2].index >= 0 && this.directions[2].index != 5 && this.direction === Phaser.RIGHT)
		{
			this.direction = Phaser.LEFT;
			return;
		}

		if(this.directions[1].index >= 0 && this.directions[1].index != 5 && this.direction === Phaser.LEFT)
		{
			this.direction = Phaser.RIGHT;
			return;
		}

		if(this.directions[3].index == -1 || this.directions[3].index == 5)
		{
			this.prevDirection = Phaser.LEFT;
			this.direction = Phaser.UP;

			this.turnPoint.x = (this.marker.x * this.gridsize) + (this.gridsize / 2);
       		this.turnPoint.y = ((this.marker.y) * this.gridsize) - (this.gridsize / 2) - 32;
		}		
	},
	
	changeLane : function()
	{
		if (this.directions[2].index >= 0 && this.direction === Phaser.RIGHT)
		{
			if(this.directions[4].index >= 0 && this.directions[4].index != 5)
			{
				this.direction = Phaser.LEFT;
				return;
			}

			this.prevDirection = this.direction;
			this.direction = Phaser.DOWN;	

			this.turnPoint.x = (this.marker.x * this.gridsize) + (this.gridsize / 2);
       		this.turnPoint.y = (this.marker.y * this.gridsize) + (this.gridsize / 2) + 32;
		}

		else if (this.directions[1].index >= 0 && this.direction === Phaser.LEFT)
		{
			if(this.directions[4].index >= 0 && this.directions[4].index != 5)
			{
				this.direction = Phaser.RIGHT;
				return;
			}

			this.prevDirection = this.direction;
			this.direction = Phaser.DOWN;

			this.turnPoint.x = (this.marker.x * this.gridsize) + (this.gridsize / 2);
       		this.turnPoint.y = (this.marker.y * this.gridsize) + (this.gridsize / 2) + 32;
		}
	},

	changeLaneAggresively : function()
	{
		if(this.directions[2].index >= 0 && this.directions[2].index != 5 && this.direction === Phaser.RIGHT)
		{
			this.direction = Phaser.LEFT;
			return;
		}

		if(this.directions[1].index >= 0 && this.directions[1].index != 5 && this.direction === Phaser.LEFT)
		{
			this.direction = Phaser.RIGHT;
			return;
		}

		if(this.directions[4].index == -1 || this.directions[4].index == 5)
		{
			this.prevDirection = Phaser.RIGHT;
			this.direction = Phaser.DOWN;

			this.turnPoint.x = (this.marker.x * this.gridsize) + (this.gridsize / 2);
       		this.turnPoint.y = ((this.marker.y) * this.gridsize) + (this.gridsize / 2) + 64;
		}		
	},

	turnUp : function()
	{
		var cx = Math.floor(this.enemy.x);
        var cy = Math.floor(this.enemy.y);

        this.enemy.position.x = this.turnPoint.x;
		      
        if (this.game.math.fuzzyEqual(cx, this.turnPoint.x, this.threshold) && this.game.math.fuzzyEqual(cy, this.turnPoint.y, this.threshold))
        {
	        this.enemy.body.velocity.y = 0;
	       	this.enemy.body.reset(this.enemy.position.x, this.enemy.position.y);
	       	this.enemy.position.y = this.turnPoint.y;

	        if (this.prevDirection === Phaser.LEFT && this.direction === Phaser.UP)
			{
				this.direction = Phaser.RIGHT;
			}
	 
			else if (this.prevDirection === Phaser.RIGHT && this.direction === Phaser.UP)
			{
				this.direction = Phaser.LEFT;
			}	
        }
	},
	
	turn : function()
	{
		var cx = Math.floor(this.enemy.x);
        var cy = Math.floor(this.enemy.y);

       	this.enemy.position.x = this.turnPoint.x;
		      
        if (this.game.math.fuzzyEqual(cx, this.turnPoint.x, this.threshold) && this.game.math.fuzzyEqual(cy, this.turnPoint.y, this.threshold))
        {
	       	this.enemy.body.velocity.y = 0;
	       	this.enemy.body.reset(this.enemy.position.x, this.enemy.position.y);
	       	this.enemy.position.y = this.turnPoint.y;	

	        if (this.prevDirection === Phaser.LEFT && this.direction === Phaser.DOWN)
			{
				this.direction = Phaser.RIGHT;
			}
	 
			else if (this.prevDirection === Phaser.RIGHT && this.direction === Phaser.DOWN)
			{
				this.direction = Phaser.LEFT;
			}
        }
	},

	move : function()
	{
		if (this.enemy.body.position.x >= 48 && this.goalDirection == Phaser.UP && this.hasEntered == false)
		{
			this.hasEntered = true;
		}
		
		if (this.enemy.body.position.x <= 704-48 && this.goalDirection == Phaser.DOWN && this.hasEntered == false)
		{
			this.hasEntered = true;
		}
		
	    var speed = this.speed;
        
        if (this.direction === Phaser.LEFT || this.direction === Phaser.UP)
        {
            speed = -speed;
        }
        
        if (this.direction === Phaser.LEFT || this.direction === Phaser.RIGHT)
        {
            this.enemy.body.velocity.x = speed;
        }
        
        else
        {
            this.enemy.body.velocity.y = speed;
        }
       
        if (this.direction === Phaser.RIGHT)
        {
            this.enemy.angle = 0;
        }
        else if (this.direction === Phaser.LEFT)
        {
            this.enemy.angle = 180;
        }
        else if (this.direction === Phaser.UP)
        {
            this.enemy.angle = -90;
        }
        else if (this.direction === Phaser.DOWN)
        {
            this.enemy.angle = 90;
        }
	},

	flipDirection : function()
	{
		if (this.direction === Phaser.LEFT)
			this.direction = Phaser.RIGHT;

		else if (this.direction === Phaser.RIGHT)
			this.direction = Phaser.LEFT;
	},

	render : function ()
	{
		this.game.debug.body(this.enemy);
	}
};

Centipede.Enemy.prototype.constructor = Centipede.Enemy;