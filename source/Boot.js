Centipede = {};

/* Here we've just got some global level vars that persist regardless of State swaps */
Centipede.gridsizeX = 20;
Centipede.gridsizeY = 20;

Centipede.score = 0;

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