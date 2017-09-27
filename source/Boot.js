Centipede = {};

/* Here we've just got some global level vars that persist regardless of State swaps */
Centipede.gridsizeX = 22;
Centipede.gridsizeY = 22;

Centipede.score = 0;
Centipede.playerLives = 3;

Centipede.spriteSize = 32;

Centipede.playerMoveSpeed = 300;
	
Centipede.Boot = function (game) {

};

Centipede.Boot.prototype = {

    preload: function () {
    
    },

    create: function () {
        this.state.start('Preloader');
    }

};