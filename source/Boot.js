Centipede = {};

/* Here we've just got some global level vars that persist regardless of State swaps */

Centipede.windowScale = 1.0;
Centipede.windowWidth = 640.0*Centipede.windowScale;
Centipede.windowHeight = 640.0*Centipede.windowScale;

Centipede.spriteSize = 8;
	
Centipede.numLanes = 30;  // How many "lanes" do we have on our screen? The original centipede has 30
Centipede.clampSize = Centipede.windowWidth/Centipede.numLanes; // How wide and how tall is a "lane"?
	
Centipede.scale = Centipede.clampSize/Centipede.spriteSize;
	
Centipede.centerLaneX = (Centipede.windowWidth/2 - (Centipede.windowWidth/2)%Centipede.clampSize);
	
Centipede.actualSpriteSize = Centipede.spriteSize*Centipede.scale;
	
Centipede.spawnZoneHeight = Centipede.windowHeight - 60; // This prevents spawning mushrooms in the area where the player spawns

Centipede.Boot = function (game) {

};

Centipede.Boot.prototype = {

    preload: function () {
    
    },

    create: function () {
        this.state.start('Preloader');
    }

};