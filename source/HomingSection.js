Centipede.HomingSection = function (game, playerObject, layout) {

	this.game = game;
	this.playerObject = playerObject;
	this.player = this.playerObject.returnPlayer();
	this.layout = layout;

	this.missileGroup = null;
	this.explosionGroup = null;

	this.launchCentipede = false;
	this.x = null;
	this.y = null;

	// Define constants that affect motion
    this.SPEED = 250; // missile speed pixels/second
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

		// If any missile is within a certain distance of the mouse pointer, blow it up
    	this.missileGroup.forEachAlive(function(m) {
	        var distance = this.game.math.distance(m.x, m.y, this.player.x, this.player.y);
        	if (distance < 50) {
            	m.kill();
            	this.getExplosion(m.x, m.y);
        	}

        	// Calculate the angle from the missile to the mouse cursor game.input.x
		    // and game.input.y are the mouse position; substitute with whatever
		    // target coordinates you need.
		    var targetAngle = this.game.math.angleBetween(
		        m.x, m.y,
		        this.player.x, this.player.y
		    );

		    // Add our "wobble" factor to the targetAngle to make the missile wobble
		    // Remember that this.wobble is tweening (above)
		    targetAngle += this.game.math.degToRad(this.wobble);

		    // Gradually (this.TURN_RATE) aim the missile towards the target angle
		    if (m.rotation !== targetAngle) {
		        // Calculate difference between the current angle and targetAngle
		        var delta = targetAngle - m.rotation;

		        // Keep it in range from -180 to 180 to make the most efficient turns.
		        if (delta > Math.PI) delta -= Math.PI * 2;
		        if (delta < -Math.PI) delta += Math.PI * 2;

		        if (delta > 0) {
		            // Turn clockwise
		            m.angle += this.TURN_RATE;
		        } else {
		            // Turn counter-clockwise
		            m.angle -= this.TURN_RATE;
		        }

		        // Just set angle to target angle if they are close
		        if (Math.abs(delta) < this.game.math.degToRad(this.TURN_RATE)) {
		            m.rotation = targetAngle;
		        }
		    }

		    // Calculate velocity vector based on this.rotation and this.SPEED
		    m.body.velocity.x = Math.cos(m.rotation) * this.SPEED;
		    m.body.velocity.y = Math.sin(m.rotation) * this.SPEED;

    	}, this);

	},

	getExplosion : function(x, y)
	{

		// Get the first dead explosion from the explosionGroup
	    var explosion = this.explosionGroup.getFirstDead();

	    // If there aren't any available, create a new one
	    if (explosion === null) {
	        explosion = this.game.add.sprite(0, 0, 'explosion');
	        explosion.anchor.setTo(0.5, 0.5);

	        // Add an animation for the explosion that kills the sprite when the
	        // animation is complete
	        //var animation = explosion.animations.add('boom', [0,1,2,3], 60, false);
	        //animation.killOnComplete = true;

	        // Add the explosion sprite to the group
	        this.explosionGroup.add(explosion);
	    }

	    explosion.revive();

	    // Move the explosion to the given coordinates
	    explosion.x = x;
	    explosion.y = y;

	    // Set rotation of the explosion at random for a little variety
	    explosion.angle = this.game.rnd.integerInRange(0, 360);

	    // Play the animation
	    //explosion.animations.play('boom');

	    // Return the explosion itself in case we want to do anything else with it
	    return explosion;

	},

	launchMissile : function (x, y)
	{

		var missile = this.missileGroup.getFirstDead();

		// If there aren't any available, create a new one
	    if (missile === null) {
	        missile = this.createMissile();
	        this.missileGroup.add(missile);
	    }

	    missile.revive();

	    this.x = x;
	    this.y = y;
	    missile.x = x;
	    missile.y = y;

	    return missile;

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

	}
};

Centipede.HomingSection.prototype.constructor = Centipede.HomingSection;