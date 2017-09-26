Centipede.Enemy = function (x, y,game, map, layout, sprite) 
{
	this.x = x;
	this.y = y;
	this.sprite = sprite;
	
	this.game = game;
	this.map = map;
	this.layout = layout;
	
	this.enemy = null;

    this.speed = 250;
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

		// The player and its settings
    	this.enemy = this.game.add.sprite(this.x, this.y, this.sprite);
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
