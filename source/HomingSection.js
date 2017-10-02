Centipede.HomingSection = function (game, playerObject, map, layout, bullets) {

	this.game = game;
	this.playerObject = playerObject;
	this.player = this.playerObject.returnPlayer();
	this.layout = layout;
	this.map = map;
	this.bullets = bullets;

	this.missileGroup = null;
	this.missile = null;
	this.explosionGroup = null;
	this.explosion = null;

	this.explosionTimer = null;
	this.isAlive = false;

	// Define constants that affect motion
    this.SPEED = 50; // missile speed pixels/second
    this.TURN_RATE = 5; // turn rate in degrees/frame
    this.WOBBLE_LIMIT = 15; // degrees
    this.WOBBLE_SPEED = 250; // milliseconds

    this.wobble = null;
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

		if (this.isAlive) {

			this.game.physics.arcade.collide(this.bullets, this.missile, this.killSection, null, this);

			// If any missile is within a certain distance of the player, blow it up
	        //this.startExplosionTimer();

	        var distance = this.game.math.distance(this.missile.x, this.missile.y, this.player.x, this.player.y);
	    	if (distance < 50) {
	    		//this.explosionTimer.stop(true);
	        	this.missile.kill();
	        	this.getExplosion(this.missile.x, this.missile.y);
	    	}

	    	// Calculate the angle from the missile to the player
		    var targetAngle = this.game.math.angleBetween(
		        this.missile.x, this.missile.y,
		        this.player.x, this.player.y
		    );

		    // Add our "wobble" factor to the targetAngle to make the missile wobble
		    // Remember that this.wobble is tweening (above)
		    targetAngle += this.game.math.degToRad(this.wobble);

		    // Gradually (this.TURN_RATE) aim the missile towards the target angle
		    if (this.missile.rotation !== targetAngle) {
		        // Calculate difference between the current angle and targetAngle
		        var delta = targetAngle - this.missile.rotation;

		        // Keep it in range from -180 to 180 to make the most efficient turns.
		        if (delta > Math.PI) delta -= Math.PI * 2;
		        if (delta < -Math.PI) delta += Math.PI * 2;

		        if (delta > 0) {
		            // Turn clockwise
		            this.missile.angle += this.TURN_RATE;
		        } else {
		            // Turn counter-clockwise
		            this.missile.angle -= this.TURN_RATE;
		        }

		        // Just set angle to target angle if they are close
		        if (Math.abs(delta) < this.game.math.degToRad(this.TURN_RATE)) {
		            this.missile.rotation = targetAngle;
		        }
		    }

		    // Calculate velocity vector based on this.rotation and this.SPEED
		    this.missile.body.velocity.x = Math.cos(this.missile.rotation) * this.SPEED;
		    this.missile.body.velocity.y = Math.sin(this.missile.rotation) * this.SPEED;
		}

	},

	killSection : function (bullet, missile)
	{

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
		
		// Create a delayed event 3s from now
		timerEvent = this.explosionTimer.add(Phaser.Timer.SECOND * 3, this.endExplosionTimer, this);
		
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

		
        this.explosion = this.game.add.sprite(0, 0, 'explosion');
        this.explosion.anchor.setTo(0.5, 0.5);
        this.game.physics.arcade.enable(this.explosion);
        // Add an animation for the explosion that kills the sprite when the
        // animation is complete
        var animation = this.explosion.animations.add('boom', [0,1,2,3], 15, false);
        animation.killOnComplete = true;

	    this.explosion.revive();

	    // Move the explosion to the given coordinates
	    this.explosion.x = x;
	    this.explosion.y = y;

	    // Set rotation of the explosion at random for a little variety
	    this.explosion.angle = this.game.rnd.integerInRange(0, 360);

	    // Play the animation
	    this.explosion.animations.play('boom');

	    // Return the explosion itself in case we want to do anything else with it
	    return this.explosion;

	},

	launchMissile : function (x, y)
	{

		this.missile = this.createMissile(x, y);

	    this.missile.revive();
	    this.isAlive = true;

	    this.missile.x = x;
	    this.missile.y = y;

	    return this.missile;

	},

	createMissile : function () 
	{

		var missileSprite = this.game.add.sprite(0, 0, 'enemyRed'); 
		missileSprite.anchor.setTo(0.5, 0.5);

		this.game.physics.arcade.enable(missileSprite);

		this.wobble = this.WOBBLE_LIMIT;
		this.game.add.tween(missileSprite).to(

				{ wobble: -this.WOBBLE_LIMIT },
            	this.WOBBLE_SPEED, Phaser.Easing.Sinusoidal.InOut, true, 0,
            	Number.POSITIVE_INFINITY, true
			);

		return missileSprite;
	}
};

Centipede.HomingSection.prototype.constructor = Centipede.HomingSection;