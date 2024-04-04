

import Phaser from 'phaser';

const config={
  type: Phaser.AUTO,
  height:600,
  width:800,
  physics:{
    default:'arcade',
    arcade:{
      debug:true,
      gravity:{y:400},
      
    }
  },
  scene:{
    preload,
    create,
    update
  }
}

function preload(){

  this.load.image('land', 'assets/land.jpg');
  this.load.image('bird','assets/bird.png')
  
}

const VELOCITY=200;

let bird=null;
const flapVelocity=250;
let initialBirdPosition={x:config.width/10, y: config.height/2}

function create(){

  this.add.image(config.width/2,config.height/2,'land')
  bird=this.physics.add.sprite(initialBirdPosition.x,initialBirdPosition.y,'bird').setOrigin(0)

  this.input.on('pointerdown', flap);
  this.input.keyboard.on('keydown-J', flap);
}

function update(time,delta){
    if(bird.y <(0-bird.height) || bird.y > config.height){
        restartBirdPositioin();
    }
}

function restartBirdPositioin(){
  bird.x=initialBirdPosition.x;
  bird.y=initialBirdPosition.y;
  bird.body.velocity=0;
}

function flap(){
  bird.body.velocity.y = -flapVelocity;
}

new Phaser.Game(config);