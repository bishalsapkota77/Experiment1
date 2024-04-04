
import Phaser from "phaser";

class PicShowScene extends Phaser.Scene{

    constructor(config){
        super('PicShowScene');
        this.config=config;

        this.quoteText='';
    }

    create(){
        this.add.image(this.config.width/2,this.config.height/2,'boruto');
        this.quoteText=this.add.text(30,200, `I want to be shadow!!`, { fontSize: '32px', fill: '#000'});
    }

}

export default PicShowScene;