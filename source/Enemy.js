Centipede.Enemy = function (x, y,game, map, layout, playerObject, type) 
{
	this.x = x;
	this.y = y;
	//this.sprite = sprite;
	
	this.type = type;
	this.playerObject = playerObject;
	this.player = this.playerObject.returnPlayer();
	
	this.game = game;
	this.map = map;
	this.layout = layout;
	
	this.enemy = null;
	this.turret = null;
	this.weapon = null;
	
    this.speed = 100;
    this.marker = new Phaser.Point();
    this.turnPoint = new Phaser.Point();
    this.directions = [ null, null, null, null, null ];

    this.gridsize = 32;
    this.threshold = 3;

    this.direction = Phaser.RIGHT;
    this.prevDirection = this.direction;
	
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
			//this.turret.angle = 270;

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
			console.log("Invalid type: " + type)
		}
		
		// The player and its settings
    	//this.enemy = this.game.add.sprite(this.x, this.y, this.sprite);
    	this.enemy.anchor.set(0.5,0.5);

		this.enemy.scale.setTo(0.9,0.9);
		
		//  We need to enable physics on the player
    	this.game.physics.arcade.enable(this.enemy);

    	this.enemy.body.collideWorldBounds = true;

    	this.move(Phaser.RIGHT);
	},


	update: function () 
	{		
	    this.marker.x = this.game.math.snapToFloor(Math.floor(this.enemy.x), this.gridsize) / this.gridsize;
        this.marker.y = this.game.math.snapToFloor(Math.floor(this.enemy.y), this.gridsize) / this.gridsize;
        
        //  Update our grid sensors
        this.directions[1] = this.map.getTileLeft(this.layout.index, this.marker.x, this.marker.y);
        this.directions[2] = this.map.getTileRight(this.layout.index, this.marker.x, this.marker.y);
        this.directions[3] = this.map.getTileAbove(this.layout.index, this.marker.x, this.marker.y);
        this.directions[4] = this.map.getTileBelow(this.layout.index, this.marker.x, this.marker.y);

		if(this.direction !== Phaser.DOWN)	
		{
			this.game.physics.arcade.collide(this.enemy, this.layout, this.changeLane, null, this);
		}
		else
		{			
			this.game.physics.arcade.overlap(this.enemy, this.layout, this.turn, null, this);
		}


		//Code for turret to track player
		if (this.type == 2)
		{

			this.turret.rotation = this.game.physics.arcade.angleBetween(this.enemy, this.player);
			this.weapon.fireAtSprite(this.player);
			//this.game.physics.arcade.collide(this.weapon.bullets, this.player, this.player.killPlayer, null, this);
			if (this.game.physics.arcade.collide(this.weapon.bullets, this.player))
				this.playerObject.killPlayer(this.weapon.bullets, this.player);
		}
	},
	
	returnEnemy : function()
	{
		return this.enemy;
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

   //     		console.log('Changing Lane, now facing');
			// console.log(this.direction);

			this.move();	
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

   //     		console.log('Changing Lane, now facing');
			// console.log(this.direction);

			this.move();
		}
	},

	turn : function()
	{
		var cx = Math.floor(this.enemy.x);
        var cy = Math.floor(this.enemy.y);
		
		//console.log(this.prevDirection);
      
        if (this.game.math.fuzzyEqual(cx, this.turnPoint.x, this.threshold) && this.game.math.fuzzyEqual(cy, this.turnPoint.y, this.threshold))
        {
	        if (this.prevDirection === Phaser.LEFT && this.direction === Phaser.DOWN)
			{
				this.direction = Phaser.RIGHT;
			}
	 
			else if (this.prevDirection === Phaser.RIGHT && this.direction === Phaser.DOWN)
			{
				this.direction = Phaser.LEFT;
			}

       		// console.log('Turning, now facing');
       		// console.log(this.direction);
			
			this.enemy.body.reset(this.turnPoint.x, this.turnPoint.y);
			
			console.log("Actually Turned at:");
	    	console.log(this.enemy.x);
	    	console.log(this.enemy.y);
	    	console.log("**************");
		
			this.move();

        }
	},

	move : function()
	{
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
        }
        else if (this.direction === Phaser.DOWN)
        {
            this.enemy.angle = 90;
        }
	},

	render : function ()
	{
		this.game.debug.body(this.enemy);
	}
};

Centipede.Enemy.prototype.constructor = Centipede.Enemy;
