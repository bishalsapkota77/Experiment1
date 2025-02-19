
import Phaser from "phaser";

const PIPES_TO_RENDER=4;

class PlayScene extends Phaser.Scene{

    constructor(config){
        super('PlayScene');
        this.config= config;

        this.bird=null;
        this.pipes=null;

        this.pipeVerticalDistanceRange=[150,250];
        this.pipeHorizontalDistanceRange=[500,550];
        this.pipeHorizontalDistance=0;
        this.flapVelocity=300;
    }

preload(){
        this.load.image('land', 'assets/land.jpg');
        this.load.image('bird', 'assets/bird.png');
        this.load.image('pipe', 'assets/pipe.png');
    }
create(){
        this.createBG();
        this.createBird();
        this.createPipes();
        this.createColliders();
        this.handleInputs();
    }
update(){
        this.checkGameStatus();
    
        this.recyclePipes();
    }

createBG(){
    this.add.image(this.config.width/2,this.config.height/2,'land')
}

createBird(){
    this.bird=this.physics.add.sprite(this.config.startPosition.x,this.config.startPosition.y,'bird').setOrigin(0)
    this.bird.body.gravity.y=600;
    this.bird.setCollideWorldBounds(true);
}

createPipes(){
    this.pipes= this.physics.add.group();

    for(let i=0; i < PIPES_TO_RENDER; i++){
      const upperPipe= this.pipes.create(0,0,'pipe')
        .setImmovable(true)
        .setOrigin(0,1);
      const lowerPipe= this.pipes.create(0,0,'pipe')
        .setImmovable(true)
        .setOrigin(0,0);
  
      this.placePipes(upperPipe,lowerPipe)
    }
  
    this.pipes.setVelocityX(-200);
}

createColliders(){
    this.physics.add.collider(this.bird,this.pipes, this.gameOver, null,this);
}

handleInputs(){
    this.input.on('pointerdown', this.flap,this);
    this.input.keyboard.on('keydown-J', this.flap,this);
}

checkGameStatus(){
    if(this.bird.getBounds().bottom>=this.config.height || this.bird.y <=0){
        this.gameOver();
    }
}
    
recyclePipes(){
    const tempPipes=[];
    this.pipes.getChildren().forEach(pipe=>{
      if (pipe.getBounds().right < 0){
        tempPipes.push(pipe);
        if(tempPipes.length === 2){
          this.placePipes(...tempPipes)
        }
      }
    })
  }
  
placePipes(uPipe,lPipe){
    
    const rightMostX= this.getRightMostPipe();
    let pipeVerticalDistance= Phaser.Math.Between(...this.pipeVerticalDistanceRange);
    let pipeVerticalPosition=Phaser.Math.Between(0+20, this.config.height-20-pipeVerticalDistance);
    let pipeHorizontalDistance= Phaser.Math.Between(...this.pipeHorizontalDistanceRange);
  
    uPipe.x= rightMostX+pipeHorizontalDistance;
    uPipe.y=pipeVerticalDistance;
  
    lPipe.x=uPipe.x;
    lPipe.y=uPipe.y+pipeVerticalDistance;
  }
  

getRightMostPipe(){
    let rightMostX=0;
  
    this.pipes.getChildren().forEach(function(pipe){
        rightMostX=Math.max(pipe.x, rightMostX);
    })
    return rightMostX ;
  }
  
gameOver(){

    this.physics.pause();
    this.bird.setTint(0xEE4824);

    this.time.addEvent({
        delay:1000,
        callback:()=>{
            this.scene.restart()
        },
        loop: false
    })
  }
  
flap(){
    this.bird.body.velocity.y = -this.flapVelocity;
  }
}

export default PlayScene;