Centipede.HomingSection = function (game, playerObject, level, map, layout, bullets) {

	this.game = game;
	this.playerObject = playerObject;
	this.level = level;
	this.player = this.playerObject.returnPlayer();
	this.layout = layout;
	this.map = map;
	this.bullets = bullets;

	this.missile = null;
	this.explosion = null;
	this.animation = null;

	this.explosionTimer = null;
	this.isAlive = false;
	this.direction = null;

	this.marker = new Phaser.Point();
	this.directions = [ null, null, null, null, null ];

	this.gridsize = 32;

	// Define constants that affect motion
    this.SPEED = 150; // missile speed pixels/second
}

Centipede.HomingSection.prototype = 
{

	initialize : function () 
	{

		this.missileGroup = this.game.add.group();
		this.explosionGroup = this.game.add.group();

	},

	update : function ()
	{

		if (this.animation != null && this.animation.isFinished == false){

			this.game.physics.arcade.overlap(this.explosion, this.layout, this.damageSurroundings, null, this);
			if (this.game.physics.arcade.collide(this.explosion, this.player)) {

				//this.playerObject.killPlayer();
				this.explosionTimer.stop(true);
				this.getExplosion(this.missile.x, this.missile.y);
				this.missile.kill();
				this.isAlive = false;   
			}
		}

		if (this.isAlive) {

			this.marker.x  = this.game.math.snapToFloor(Math.floor(this.missile.x), this.gridsize) / this.gridsize;
	        this.marker.y = this.game.math.snapToFloor(Math.floor(this.missile.y), this.gridsize) / this.gridsize;

	        this.directions[3] = this.map.getTileAbove(this.layout.index, this.marker.x, this.marker.y);
	        this.directions[4] = this.map.getTileBelow(this.layout.index, this.marker.x, this.marker.y);

	        if (this.marker.x <= 1 || this.marker.y >= 20 || this.marker.y <= 1 || this.marker.y >= 26){
	        	this.explosionTimer.stop(true);
	        	this.missile.kill();
				this.getExplosion(this.missile.x, this.missile.y);
	        }

	        if (this.direction == -1){
	        	if (this.directions[4].index == -1 || this.directions[4].index == 5)
	        		this.level.placeAt(this.marker.x, this.marker.y);
	        }
	        else {
	        	if (this.directions[3].index == -1 || this.directions[3].index == 5)
	        		this.level.placeAt(this.marker.x, this.marker.y);
	        }

			//this.game.physics.arcade.collide(this.bullets, this.missile, this.killSection, null, this);
			
			if (this.game.physics.arcade.collide(this.missile, this.player)) {

				this.playerObject.killPlayer();
				this.explosionTimer.stop(true);
				this.getExplosion(this.missile.x, this.missile.y);
				this.missile.kill();
				this.isAlive = false;
			}

		    this.missile.body.velocity.y = this.direction*this.SPEED;

		}

	},

	playPoof : function(tile, index)
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

	damageSurroundings : function(explosion, tile)
	{
		/* NO EXPLOSION DAMAGE....FOR NOW...
		var posX = tile.x;
		var posY = tile.y;
		var index = tile.index
		var layer = tile.layer

		if (index == 4)
		{	
			return;
		}

		if (index <= 3 && index != -1)
			this.playPoof(tile, index);

		tile.destroy();

		this.map.putTile(5,posX,posY,this.layer);
		*/
		return;
	},

	killSection : function (bullet, missile)
	{

		this.explosionTimer.stop(true);
		bullet.kill();
		missile.kill();
		this.isAlive = false;
        this.getExplosion(missile.x, missile.y);

	},

	startExplosionTimer : function ()
	{
		var timerEvent;
		
		// Create a custom timer
		this.explosionTimer = this.game.time.create();
		
		// Create a delayed event 1-3s from now
		var time = this.game.rnd.integerInRange(1,3);
		timerEvent = this.explosionTimer.add(Phaser.Timer.SECOND * time, this.endExplosionTimer, this);
		
		// Start the timer
		this.explosionTimer.start();
	},

	endExplosionTimer : function ()
	{
		//stop the explosion timer
		this.explosionTimer.stop();
		this.missile.kill();
		this.getExplosion(this.missile.x, this.missile.y);

	},

	getExplosion : function(x, y)
	{
		//kill the homing section
		this.isAlive = false;
		
        this.explosion = this.game.add.sprite(0, 0, 'explosionRed');
        this.explosion.anchor.setTo(0.5, 0.5);
        
        this.game.physics.arcade.enable(this.explosion);
        this.explosion.body.setSize(Centipede.spriteSize*3, Centipede.spriteSize*3, this.explosion.x - 32, this.explosion.y - 32);

        // Add an animation for the explosion that kills the sprite when the
        // animation is complete
        this.animation = this.explosion.animations.add('boom', [0,1,2,3], 15, false);
        this.animation.killOnComplete = true;

	    this.explosion.revive();

	    // Move the explosion to the given coordinates
	    this.explosion.x = x;
	    this.explosion.y = y;

	    // Set rotation of the explosion at random for a little variety
	    this.explosion.angle = this.game.rnd.integerInRange(0, 360);

	    // Play the animation
	    this.explosion.animations.play('boom');

		Centipede.OurSound.playHomingDeath();
	    //Shake the screen
	    //this.game.camera.shake(0.03, 500);

	    // Return the explosion itself in case we want to do anything else with it
	    return this.explosion;

	},

	launchMissile : function (x, y)
	{
		this.missile = this.createMissile(x, y);

		if (y > this.player.y)
			this.direction = -1;

		else
			this.direction = 1; 

	    this.missile.revive();

	    this.startExplosionTimer();
	    this.isAlive = true;

	    this.missile.x = x;
	    this.missile.y = y;

	    return this.missile;
	},

	createMissile : function () 
	{
		var missileSprite = this.game.add.sprite(0, 0, 'enemyRed'); 
		missileSprite.anchor.setTo(0.5, 0.5);
		missileSprite.angle = -90;

		this.game.physics.arcade.enable(missileSprite);

		return missileSprite;
	},

	render : function()
	{

		if (this.explosion != null)
			this.game.debug.body(this.explosion);

	}
};

Centipede.HomingSection.prototype.constructor = Centipede.HomingSection;