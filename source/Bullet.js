Centipede.Bullet = function (game, fire, obstacles, player, maxBullets) {
	
	this.game = game;
	
	this.fire = fire;

	this.player = player;

	this.obstacles = obstacles;

	this.bullets = this.game.add.group();
	this.bullets.enableBody = true;
    this.bullets.physicsBodyType = Phaser.Physics.ARCADE;

    this.maxBullets = maxBullets;

    this.bulletSpeed = 600;
	this.bulletTime = 0; // Keep 0, this tracks the time since we fired our last bullet.
	this.fireRate = 50;

	this.singleBullet = null;

	return this;

};

Centipede.Bullet.prototype = {

	initialize : function () {
	    for (var i = 0; i < this.maxBullets; i++) // Right now, we're only allowing 1 bullet on the screen at a time, as is the case in Centipede.
	    {
	        var b = this.game.add.sprite(0, 0, 'bullet');
	        b.name = 'bullet' + i;
	        b.exists = false;
	        b.visible = false;
	        b.checkWorldBounds = true;
	        b.events.onOutOfBounds.add(this.resetBullet, this);
			
			b.scale.setTo(Centipede.scale, Centipede.scale);
			
			this.bullets.add(b);
	    }
	},

	update : function () {

		if(this.fire.isDown)
			this.fireBullet();

		this.game.physics.arcade.overlap(this.bullets, this.obstacles, this.damageObstacle, null, this);
	},


	fireBullet : function () {
		
		console.log('test1');
		if (this.game.time.now > this.bulletTime)
    	{
        	console.log('test2');
        	this.singleBullet = this.bullets.getFirstExists(false);
        	
        	if (this.singleBullet)
        	{
            	console.log('test3');
            	this.singleBullet.reset(this.player.x+(Centipede.actualSpriteSize/2), this.player.y - 8);
            	this.singleBullet.body.velocity.y = -this.bulletSpeed;
            	bulletTime = this.game.time.now + this.fireRate;
        	}
    	}
	    
	},

	resetBullet : function (b) {

		b.kill();
		console.log('test4');
	    
	},

	damageObstacle : function (b, obstacle) {

		b.kill();
		var temp = obstacle.frame + 1;
		obstacle.frame = temp;

		console.log('test5');

		if (temp > 3)
		{
			//score += 1;
			//scoreText.text = score;
			obstacle.kill();
		}
	    
	},
	
	returnBullets : function ()
	{
		return this.bullets;
	}
};

Centipede.Bullet.prototype.constructor = Centipede.Bullet;
