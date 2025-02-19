


import Phaser from "phaser";

class PreloadScene extends Phaser.Scene{

    constructor(){
        super('PreloadScene');
    }
    
    preload(){
        this.load.image('land', 'assets/land.jpg');
        this.load.image('bird', 'assets/bird.png');
        this.load.image('pipe', 'assets/pipe.png');
        this.load.image('pause','assets/pause.png');
        this.load.image('picshow','assets/picshow.png');
        this.load.image('boruto','assets/Boruto.jpg');
    }

    create(){
        this.scene.start('MenuScene');
    }

}

export default PreloadScene;