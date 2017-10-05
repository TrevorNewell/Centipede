
Centipede.Bullet = function (game, fire, map, layout, player, maxBullets, score) 
{
	
	this.game = game;
	this.fire = fire;
	this.player = player;
	this.map = map;
	this.layout = layout;
    this.maxBullets = maxBullets;
    this.score = score;
		
    this.bulletSpeed = 600;

	this.bulletTime = 0; // Keep 0, this tracks the time since we fired our last bullet.
	this.fireRate = 50;

	this.singleBullet = null;

	this.weapon = null;

	this.bulletAnimation = null;

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
        this.weapon.fireRate = 100;

		// Only play a sound when we successfully fire.
		this.weapon.onFire = new Phaser.Signal();
		this.weapon.onFire.add(Centipede.OurSound.playPlayerShoot, Centipede.OurSound);
		
		// Add our bullet explosion effect.
		this.weapon.onKill = new Phaser.Signal();
		this.weapon.onKill.add(this.playBulletExplode, this);
		
        //  Tell the Weapon to track the 'player' Sprite
        this.weapon.trackSprite(this.player, 10, 0, true);
	},

	update : function () 
	{
		if(this.fire.isDown)  
		{		
    		this.player.animations.play('shoot', 30, true);
			this.weapon.fire();
		}
		else
		{
			this.player.animations.stop();
			this.player.frame = 0;
		}
 
		this.game.physics.arcade.collide(this.weapon.bullets, this.layout, this.damageObstacle, null, this);
	},

	playBulletExplode : function(bullet)
	{
		var explodeAnim = this.game.add.sprite(bullet.x, bullet.y, 'explosionBlue');
		explodeAnim.anchor.set(0.5);
		explodeAnim.scale.setTo(0.4,0.4);
		explodeAnim.rotation = this.game.rnd.integerInRange(0,359);
		explodeAnim.animations.add('explode');
		explodeAnim.animations.play('explode', 20, false, true);
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
		{
			this.score.createScoreAnimation(bullet.x, bullet.y, "+10", 10);
			this.playPoof(tile, index);
		}
	},
	
	playPoof: function(tile, index)
	{
		var poofScale = 2;
		
		var gridsize = 32;
		
		var markerX = tile.x * gridsize + gridsize/2;
        var markerY = tile.y * gridsize + gridsize/2;
				
		var poofAnim = this.game.add.sprite(markerX, markerY, 'poof');
		poofAnim.anchor.set(0.5);
		poofAnim.scale.setTo(poofScale);
		poofAnim.rotation = this.game.rnd.integerInRange(0,359);
		poofAnim.animations.add('poof');
		poofAnim.animations.play('poof', 30, false, true);
	},
	
	returnBullets : function ()
	{
		return this.weapon.bullets;
	},
};

Centipede.Bullet.prototype.constructor = Centipede.Bullet;