import Phaser from 'phaser';

const config = {
  type: Phaser.AUTO,
  height: 600,
  width: 800,
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
    },
  },
  scene: {
    preload,
    create,
    update,
  },
};

let bird = null;
let pipes = null;

const pipeVerticalDistanceRange = [150, 250];
const pipeHorizontalDistanceRange = [500, 550];
const flapVelocity = 250;
const initialBirdPosition = { x: config.width / 1.1, y: config.height / 2 };

function preload() {
  this.load.image('land', 'assets/land.jpg');
  this.load.image('bird', 'assets/bird.png');
  this.load.image('cactus', 'assets/cactus.png');
}

const VELOCITY = 200;
const PIPES_TO_RENDER = 4;

function create() {
  this.add.image(config.width / 2, config.height / 2, 'land');
  bird = this.physics.add.sprite(initialBirdPosition.x, initialBirdPosition.y, 'bird').setOrigin(0);
  bird.body.gravity.y = -400;

  pipes = this.physics.add.group();

  for (let i = 0; i < PIPES_TO_RENDER; i++) {
    const upperPipe = pipes.create(0, 0, 'cactus').setOrigin(0, 1);
    const lowerPipe = pipes.create(0, 0, 'cactus').setOrigin(0, 0);

    placePipes(upperPipe, lowerPipe);
  }

  pipes.setVelocityX(200);

  this.input.on('pointerdown', flap);
  this.input.keyboard.on('keydown-J', flap);
}

function update(time, delta) {
  if (bird.y < (0 - bird.height) || bird.y > config.height) {
    restartBirdPosition();
  }

  recyclePipes();
}

function recyclePipes() {
  const tempPipes = [];
  pipes.getChildren().forEach(pipe => {
    if (pipe.getBounds().left > config.width) { 
      tempPipes.push(pipe);
      if (tempPipes.length === 2) {
        placePipes(...tempPipes);
      }
    }
  });
}

function placePipes(uPipe, lPipe) {
  const leftMostX = getLeftMostPipe();
  let pipeVerticalDistance = Phaser.Math.Between(...pipeVerticalDistanceRange);
  let pipeVerticalPosition = Phaser.Math.Between(0 + 20, config.height - 20 - pipeVerticalDistance);
  let pipeHorizontalDistance = Phaser.Math.Between(...pipeHorizontalDistanceRange);

  uPipe.x = leftMostX - pipeHorizontalDistance; 
  uPipe.y = pipeVerticalDistance;

  lPipe.x = uPipe.x;
  lPipe.y = uPipe.y + pipeVerticalDistance;
}

function getLeftMostPipe() {
  let leftMostX = config.width;

  pipes.getChildren().forEach(function (pipe) {
    leftMostX = Math.min(pipe.x, leftMostX);
  });
  return leftMostX;
}

function restartBirdPosition() {
  bird.x = initialBirdPosition.x;
  bird.y = initialBirdPosition.y;
  bird.body.velocity.y = 0;
}

function flap() {
  bird.body.velocity.y = flapVelocity;
}

new Phaser.Game(config);


