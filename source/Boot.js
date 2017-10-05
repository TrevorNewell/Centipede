Centipede = {};

/* Here we've just got some global level vars that persist regardless of State swaps */
Centipede.gridsizeX = 22;
Centipede.gridsizeY = 28;

Centipede.count = 0;

Centipede.score = 0;

Centipede.playerLives = 5;
Centipede.playerUpdate = false;

Centipede.spriteSize = 32;

Centipede.playerMoveSpeed = 300;

Centipede.OurSound;
	
Centipede.Boot = function (game) {

};

Centipede.Boot.prototype = {

    preload: function () {
    
    },

    create: function () {
        this.state.start('Preloader');
    }

};