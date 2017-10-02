Centipede.Enemy = function (x, y, game, bullets, level, map, layout, playerObject, type, goalDirection, homingSection) 
{
	this.x = x;
	this.y = y;
	//this.sprite = sprite;
		
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
	
    this.speed = 50;
    this.marker = new Phaser.Point();
    this.turnPoint = new Phaser.Point();
    this.directions = [ null, null, null, null, null ];

    this.gridsize = 32;
    this.threshold = 5;

	this.goalDirection = goalDirection;
	
	if (this.goalDirection == Phaser.DOWN)
	{
		this.direction = Phaser.RIGHT;
		this.prevDirection = this.direction;
	}
	else if (this.goalDirection == Phaser.UP)
	{
		this.direction = Phaser.LEFT;
		this.prevDirection = this.direction;
	}
	else
	{
		console.log("Invalid goalDirection: " + this.goalDirection);
	}
	
	this.hasEntered = false;
	
	return this;
};

Centipede.Enemy.prototype = 
{
	initialize: function () {

		if (this.type == 0) // Head of Centipede
		{
			this.enemy = this.game.add.sprite(this.x, this.y, 'enemyRed');
		}
		else  if (this.type == 1) // Regular section
		{
			this.enemy = this.game.add.sprite(this.x, this.y, 'enemy');
		}
		else if (this.type == 2) // Sentry section
		{
			this.enemy = this.game.add.sprite(this.x, this.y, 'enemyTurretHull');
			
			this.turret = this.enemy.addChild(this.game.make.sprite(8, 0, 'enemyTurret'));
			
			this.turret.scale.setTo(0.9,0.9);
			this.turret.anchor.set(0.25, 0.5);
			
			//   Init weapon group and fill it with maxBullets
		    this.weapon = this.game.add.weapon(2, 'bullet');

		     //  The bullet will be automatically killed when it leaves the world bounds
	        this.weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;

	        //  Because our bullet is drawn facing up, we need to offset its rotation:
	        this.weapon.bulletAngleOffset = 90;

	        //Scaling the bullet size
	        this.weapon.bullets.forEach((bullet) => {
			  bullet.body.updateBounds(); //To avoid scaling bug with physics
			  }, this);

			this.weapon.fireRate = 3000; // Measured in milliseconds.
			
	        //  The speed at which the bullet is fired
	        this.weapon.bulletSpeed = 200;

	        //  Tell the Weapon to track the 'turret' Sprite
	        this.weapon.trackSprite(this.turret, 15, 0, true);
			
			this.weapon.onFire = new Phaser.Signal();
			this.weapon.onFire.add(Centipede.OurSound.playCentipedeShoot, Centipede.OurSound);

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
    	//this.enemy = this.game.add.sprite(this.x, this.y, this.sprite);
    	this.enemy.anchor.set(0.5,0.5);

		this.enemy.scale.setTo(1,1);
		
		//  We need to enable physics on the player
    	this.game.physics.arcade.enable(this.enemy);

		this.enemy.body.setSize(24, 24, 4, 4);

    	//this.enemy.body.collideWorldBounds = true;
	},
	
	update: function () 
	{	
		if (this.enemy.alive) this.game.physics.arcade.collide(this.player, this.enemy, this.centipedeKillPlayer, null, this); // Disabled rn.  Player dies repeatedly in same spot.
		if (this.enemy.alive) this.game.physics.arcade.collide(this.bullets, this.enemy, this.killSection, null, this);

		//console.log(this.enemy.body.touching.left);
        
        //  Update our grid sensors
        this.directions[1] = this.map.getTileLeft(this.layout.index, this.marker.x, this.marker.y);
        this.directions[2] = this.map.getTileRight(this.layout.index, this.marker.x, this.marker.y);
        this.directions[3] = this.map.getTileAbove(this.layout.index, this.marker.x, this.marker.y);
        this.directions[4] = this.map.getTileBelow(this.layout.index, this.marker.x, this.marker.y);

		//console.log(this.hasEntered);
		
		if (this.hasEntered)
		{
			if (this.goalDirection == Phaser.DOWN)
			{
				this.marker.x = this.game.math.snapToFloor(Math.floor(this.enemy.x), this.gridsize) / this.gridsize;
        		this.marker.y = this.game.math.snapToFloor(Math.floor(this.enemy.y), this.gridsize) / this.gridsize;

        		if (this.marker.y == 20 && this.marker.x == 10)
        			this.goalDirection = Phaser.UP;

				if(this.direction != Phaser.DOWN)	
				{
					this.game.physics.arcade.collide(this.enemy, this.layout, this.changeLane, null, this);
					this.game.physics.arcade.overlap(this.enemy, this.enemy, this.changeLane, null, this);
				}
				else
				{			
					this.game.physics.arcade.overlap(this.enemy, this.layout, this.turn, null, this);
				}
			}
			else if (this.goalDirection == Phaser.UP)
			{
				this.marker.x = this.game.math.snapToFloor(Math.floor(this.enemy.x), this.gridsize) / this.gridsize;
        		this.marker.y = this.game.math.snapToFloor(Math.floor(this.enemy.y), this.gridsize) / this.gridsize;
				
				if (this.marker.y == 1 && this.marker.x == 10)
        			this.goalDirection = Phaser.DOWN;
				
				if(this.direction != Phaser.UP)	
				{
					//console.log("Debug!");
					this.game.physics.arcade.collide(this.enemy, this.layout, this.changeLaneUp, null, this);
					this.game.physics.arcade.overlap(this.enemy, this.enemy, this.changeLaneUp, null, this);

					//console.log(this.directions[2].index)
				}
				else
				{			
					this.game.physics.arcade.overlap(this.enemy, this.layout, this.turnUp, null, this);
				}
			}
			//console.log(this.marker.y);
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
			//this.game.physics.arcade.collide(this.weapon.bullets, this.player, this.turretKillPlayer)
			
			this.game.physics.arcade.collide(this.weapon.bullets, this.layout, this.damageObstacle, null, this);

			if (this.game.physics.arcade.collide(this.weapon.bullets, this.player))
			{
				//this.playerObject.killPlayer();
				this.weapon.forEach(function(bullet){bullet.kill();});
			}	
		}
		
		this.move();
	},
	
	damageObstacle : function (bullet, tile)
	{

		bullet.kill();

		var posX = tile.x;
		var posY = tile.y;
		var index = tile.index
		var layer = tile.layer

		tile.destroy();

		if (index <= 3)
			this.map.putTile(index+1,posX,posY,this.layer);

		else
			this.map.putTile(4,posX,posY,this.layer);

	},

	killSection : function(centipede, bullet)
	{
		Centipede.OurSound.playCentipedeDeath();
		
		Centipede.count--;
		console.log("Killing that <insert politically correct term here>");
		
		bullet.kill();
		
		// Spawn Wreckage at the centipedes current tile.
		var x  = this.game.math.snapToFloor(Math.floor(centipede.x), this.gridsize) / this.gridsize;
        var y = this.game.math.snapToFloor(Math.floor(centipede.y), this.gridsize) / this.gridsize;
		
		this.level.placeAt(x, y);
		
		if (this.type == 3)
		{

			this.homingSection.launchMissile(centipede.x, centipede.y);
			//this.homingSection.launchMissile(x, y);

		}

		centipede.kill();
		
		//console.log(this.centipedes.length);
	},
	
	centipedeKillPlayer : function (player, enemy)
	{
		Centipede.count--;
		
		console.log("CENTIPEDE DIE");
		
		enemy.kill();
		
		if (enemy.type == 2) this.turret.alive = false;
		
		// Kill Player
		this.playerObject.killPlayer();
	},
	
	turretKillPlayer : function (bullet, player)
	{
		console.log("HELK");
		bullet.kill();
		this.playerObject.killPlayer();
	},
	
	returnEnemy : function()
	{
		return this.enemy;
	},

	changeLaneUp : function()
	{
		if (this.directions[2].index === 0 && this.direction === Phaser.RIGHT)
		{
			this.prevDirection = this.direction;
			this.direction = Phaser.UP;	

			this.turnPoint.x = (this.marker.x * this.gridsize) + (this.gridsize / 2);
       		this.turnPoint.y = ((this.marker.y) * this.gridsize) - (this.gridsize / 2);

			/*
			console.log("Supposed to Turn at:");
			console.log(this.turnPoint.x);
			console.log(this.turnPoint.y);
			*/
		}

		else if (this.directions[1].index === 0 && this.direction === Phaser.LEFT)
		{
			this.prevDirection = this.direction;
			this.direction = Phaser.UP;

			this.turnPoint.x = (this.marker.x * this.gridsize) + (this.gridsize / 2);
       		this.turnPoint.y = ((this.marker.y) * this.gridsize) - (this.gridsize / 2);

			/*
			console.log("Supposed to Turn at:");
			console.log(this.turnPoint.x);
			console.log(this.turnPoint.y);
			*/
		}
	},
	
	changeLane : function()
	{
		if (this.directions[2].index === 0 && this.direction === Phaser.RIGHT)
		{
			this.prevDirection = this.direction;
			this.direction = Phaser.DOWN;	

			this.turnPoint.x = (this.marker.x * this.gridsize) + (this.gridsize / 2);
       		this.turnPoint.y = (this.marker.y * this.gridsize) + (this.gridsize / 2) + 32;

			/*
       		console.log("Supposed to Turn at:");
			console.log(this.turnPoint.x);
			console.log(this.turnPoint.y);
			*/
		}

		else if (this.directions[1].index === 0 && this.direction === Phaser.LEFT)
		{
			this.prevDirection = this.direction;
			this.direction = Phaser.DOWN;

			this.turnPoint.x = (this.marker.x * this.gridsize) + (this.gridsize / 2);
       		this.turnPoint.y = (this.marker.y * this.gridsize) + (this.gridsize / 2) + 32;

			/*
       		console.log("Supposed to Turn at:");
			console.log(this.turnPoint.x);
			console.log(this.turnPoint.y);
			*/
		}
	},

	turnUp : function()
	{
		var cx = Math.floor(this.enemy.x);
        var cy = Math.floor(this.enemy.y);
		
		//console.log(this.prevDirection);
      
        if (this.game.math.fuzzyEqual(cx, this.turnPoint.x, this.threshold) && this.game.math.fuzzyEqual(cy, this.turnPoint.y, this.threshold))
        {
	        this.enemy.body.velocity.y = 0;
	       	this.enemy.body.velocity.x = 0;
	       	this.enemy.body.reset(this.enemy.position.x, this.enemy.position.y);

	        if (this.prevDirection === Phaser.LEFT && this.direction === Phaser.UP)
			{
				this.direction = Phaser.RIGHT;
			}
	 
			else if (this.prevDirection === Phaser.RIGHT && this.direction === Phaser.UP)
			{
				this.direction = Phaser.LEFT;
			}
			
			this.enemy.position.x = this.turnPoint.x;
			this.enemy.position.y = this.turnPoint.y;

			/*
			console.log("Actually Turned at:");
	    	console.log(this.enemy.x);
	    	console.log(this.enemy.y);
	    	console.log("**************");
			*/
        }
	},
	
	turn : function()
	{
		var cx = Math.floor(this.enemy.x);
        var cy = Math.floor(this.enemy.y);
		
		//console.log(this.prevDirection);
      
        if (this.game.math.fuzzyEqual(cx, this.turnPoint.x, this.threshold) && this.game.math.fuzzyEqual(cy, this.turnPoint.y, this.threshold))
        {
	       	this.enemy.body.velocity.y = 0;
	       	this.enemy.body.velocity.x = 0;
	       	this.enemy.body.reset(this.enemy.position.x, this.enemy.position.y);

	        if (this.prevDirection === Phaser.LEFT && this.direction === Phaser.DOWN)
			{
				this.direction = Phaser.RIGHT;
			}
	 
			else if (this.prevDirection === Phaser.RIGHT && this.direction === Phaser.DOWN)
			{
				this.direction = Phaser.LEFT;
			}

			this.enemy.position.x = this.turnPoint.x;
			this.enemy.position.y = this.turnPoint.y;	

			/*
			console.log("Actually Turned at:");
	    	console.log(this.enemy.x);
	    	console.log(this.enemy.y);
	    	console.log("**************");
			*/
        }
	},

	move : function()
	{
		if (this.enemy.body.position.x >= 48 && this.goalDirection == Phaser.DOWN && this.hasEntered == false)
		{
			this.hasEntered = true;
		}
		
		if (this.enemy.body.position.x <= 704-48 && this.goalDirection == Phaser.UP && this.hasEntered == false)
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
		
        //  Reset the scale and angle (Pacman is facing to the right in the sprite sheet)
        //this.enemy.scale.x = 1;
       
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
			//this.enemy.body.angle = 270;
        }
        else if (this.direction === Phaser.DOWN)
        {
            this.enemy.angle = 90;
			//this.enemy.body.angle = 90;
        }
	},

	render : function ()
	{
		this.game.debug.body(this.enemy);
	}
};

Centipede.Enemy.prototype.constructor = Centipede.Enemy;