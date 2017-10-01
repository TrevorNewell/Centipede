
Centipede.Bullet = function (game, fire, map, layout, player, maxBullets, score) 
{
	
	this.game = game;
	this.fire = fire;
	this.player = player;
	this.map = map;
	this.layout = layout;
    this.maxBullets = maxBullets;
    this.score = score;
	
	//this.sound = sound;
	
    this.bulletSpeed = 600;
	this.bulletTime = 0; // Keep 0, this tracks the time since we fired our last bullet.
	this.fireRate = 50;

	this.singleBullet = null;

	this.weapon = null;

	return this;

};

Centipede.Bullet.prototype = 
{

	initialize : function () 
	{
	    //   Init weapon group and fill it with maxBullets
	    this.weapon = this.game.add.weapon(this.maxBullets, 'bullet');

	     //  The bullet will be automatically killed when it leaves the world bounds
        this.weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;

        //  Because our bullet is drawn facing up, we need to offset its rotation:
        this.weapon.bulletAngleOffset = 90;

        //Scaling the bullet size
        this.weapon.bullets.forEach((bullet) => {
		  bullet.body.updateBounds(); //To avoid scaling bug with physics
		  }, this);

        //  The speed at which the bullet is fired
        this.weapon.bulletSpeed = this.bulletSpeed;

		// Only play a sound when we successfully fire.
		this.weapon.onFire = new Phaser.Signal();
		this.weapon.onFire.add(Centipede.OurSound.playPlayerShoot, Centipede.OurSound);
		
        //  Tell the Weapon to track the 'player' Sprite
        this.weapon.trackSprite(this.player, 10, 0, true);

	},

	update : function () 
	{
		if(this.fire.isDown)  
		{		
			this.weapon.fire();
		}
 
		this.game.physics.arcade.collide(this.weapon.bullets, this.layout, this.damageObstacle, null, this);
	},

	playFireSound: function()
	{
		this.sound.playPlayerShoot();
	},
	
	damageObstacle : function (bullet, tile) 
	{
		Centipede.OurSound.playObstacleShot();
		
		bullet.kill();

		var posX = tile.x;
		var posY = tile.y;
		var index = tile.index
		var layer = tile.layer

		if (index == 4)
		{	
			return;
		}

		tile.destroy();

		if (index <= 2)
			this.map.putTile(index+1,posX,posY,this.layer);

		else
			this.map.putTile(5,posX,posY,this.layer);

		if(index == 3) 
			this.score.createScoreAnimation(bullet.x, bullet.y, "+10", 10);
	},
	
	returnBullets : function ()
	{
		return this.weapon.bullets;
	},
};

Centipede.Bullet.prototype.constructor = Centipede.Bullet;