Centipede.Enemy = function (x, y,game, map, layout, playerObject, type, goalDirection) 
{
	this.x = x;
	this.y = y;
	//this.sprite = sprite;
	
	this.up = null;
	this.down = null;
	this.left = null;
	this.right = null;
		
	this.type = type;
	this.playerObject = playerObject;
	this.player = this.playerObject.returnPlayer();
	
	this.game = game;
	this.map = map;
	this.layout = layout;
	
	this.enemy = null;
	this.turret = null;
	this.weapon = null;
	
    this.speed = 250;
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
			
			this.turret.anchor.set(0.25, 0.5);
			this.turret.scale.setTo(0.9,0.9);

			//   Init weapon group and fill it with maxBullets
		    this.weapon = this.game.add.weapon(1, 'bullet');

		     //  The bullet will be automatically killed when it leaves the world bounds
	        this.weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;

	        //  Because our bullet is drawn facing up, we need to offset its rotation:
	        this.weapon.bulletAngleOffset = 90;

	        //Scaling the bullet size
	        this.weapon.bullets.forEach((bullet) => {
			  bullet.body.updateBounds(); //To avoid scaling bug with physics
			  }, this);

	        //  The speed at which the bullet is fired
	        this.weapon.bulletSpeed = 300;

	        //  Tell the Weapon to track the 'turret' Sprite
	        this.weapon.trackSprite(this.turret, 15, 0, true);

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
					this.game.physics.arcade.collide(this.enemy, this.enemy, this.changeLane, null, this);
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
					this.game.physics.arcade.collide(this.enemy, this.enemy, this.changeLaneUp, null, this);

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
		if (this.type == 2)
		{
			this.turret.rotation = this.game.physics.arcade.angleBetween(this.enemy, this.player);
			if(this.player.alive == true)
				this.weapon.fireAtSprite(this.player);
			
			if (this.game.physics.arcade.collide(this.weapon.bullets, this.player)){
				this.playerObject.killPlayer(this.player);
				this.weapon.forEach(function(bullet){
					bullet.kill();
				})
			}
		}
		
		this.move();
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

			console.log("Supposed to Turn at:");
			console.log(this.turnPoint.x);
			console.log(this.turnPoint.y);
		}

		else if (this.directions[1].index === 0 && this.direction === Phaser.LEFT)
		{
			this.prevDirection = this.direction;
			this.direction = Phaser.UP;

			this.turnPoint.x = (this.marker.x * this.gridsize) + (this.gridsize / 2);
       		this.turnPoint.y = ((this.marker.y) * this.gridsize) - (this.gridsize / 2);

			console.log("Supposed to Turn at:");
			console.log(this.turnPoint.x);
			console.log(this.turnPoint.y);
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

       		console.log("Supposed to Turn at:");
			console.log(this.turnPoint.x);
			console.log(this.turnPoint.y);
		}

		else if (this.directions[1].index === 0 && this.direction === Phaser.LEFT)
		{
			this.prevDirection = this.direction;
			this.direction = Phaser.DOWN;

			this.turnPoint.x = (this.marker.x * this.gridsize) + (this.gridsize / 2);
       		this.turnPoint.y = (this.marker.y * this.gridsize) + (this.gridsize / 2) + 32;

       		console.log("Supposed to Turn at:");
			console.log(this.turnPoint.x);
			console.log(this.turnPoint.y);
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

			console.log("Actually Turned at:");
	    	console.log(this.enemy.x);
	    	console.log(this.enemy.y);
	    	console.log("**************");
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
			console.log("Actually Turned at:");
	    	console.log(this.enemy.x);
	    	console.log(this.enemy.y);
	    	console.log("**************");
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
        this.enemy.scale.x = 1;
        this.enemy.angle = 0;
        
        if (this.direction === Phaser.LEFT)
        {
            this.enemy.scale.x = -1;
        }
        
        else if (this.direction === Phaser.UP)
        {
            this.enemy.angle = 270;
			this.enemy.body.angle = 270;
        }
        
        else if (this.direction === Phaser.DOWN)
        {
            this.enemy.angle = 90;
			this.enemy.body.angle = 90;
        }
	},

	render : function ()
	{
		this.game.debug.body(this.enemy);
	}
};

Centipede.Enemy.prototype.constructor = Centipede.Enemy;