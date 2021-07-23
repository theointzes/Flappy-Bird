console.log("Flappy Bird");

let frames = 0;
const hitSound = new Audio();
hitSound.src = "./efeitos/hit.wav";
const sprites = new Image();
sprites.src = "./sprites.png";

function floorCollision() {
  let flappyBirdY = global.flappyBird.dY + global.flappyBird.sHeight;
  let floorY = global.floor.dY;
  if (flappyBirdY >= floorY) {
    return true;
  }
  return false;
}

function createBird() {
  const flappyBird = {
    sX: 0,
    sY: 0,
    sWidth: 33,
    sHeight: 24,
    dX: 10,
    dY: 50,
    gravity: 0.25,
    speed: 0,
    jumpHeight: 4.6,
    jump() {
      flappyBird.speed = -flappyBird.jumpHeight;
    },
    refresh() {
      if (floorCollision(global.flappyBird, global.floor)) {
        hitSound.play();
        setTimeout(() => {
          changeScreen(screens.home);
        }, 500);
        return;
      }
      flappyBird.speed = flappyBird.speed + flappyBird.gravity;
      flappyBird.dY = flappyBird.dY + flappyBird.speed;
    },
    movement: [
      { sX: 0, sY: 0 },
      { sX: 0, sY: 26 },
      { sX: 0, sY: 52 },
    ],
    spriteFrame: 0,
    refreshSpriteFrame() {
      if (frames % 10 === 0) {
        flappyBird.spriteFrame =
          (1 + flappyBird.spriteFrame) % flappyBird.movement.length;
      }
    },
    draw() {
      flappyBird.refreshSpriteFrame();
      const { sX, sY } = flappyBird.movement[flappyBird.spriteFrame];
      contexto.drawImage(
        sprites,
        sX,
        sY,
        flappyBird.sWidth,
        flappyBird.sHeight,
        flappyBird.dX,
        flappyBird.dY,
        flappyBird.sWidth,
        flappyBird.sHeight
      );
    },
  };
  return flappyBird;
}

function createFloor() {
  const floor = {
    sX: 0,
    sY: 610,
    sWidth: 224,
    sHeight: 112,
    dX: 0,
    dY: canvas.height - 112,
    refresh() {
      floor.dX = (floor.dX - 1) % (floor.sWidth / 2);
    },
    draw() {
      contexto.drawImage(
        sprites,
        floor.sX,
        floor.sY,
        floor.sWidth,
        floor.sHeight,
        floor.dX,
        floor.dY,
        floor.sWidth,
        floor.sHeight
      );
      contexto.drawImage(
        sprites,
        floor.sX,
        floor.sY,
        floor.sWidth,
        floor.sHeight,
        floor.dX + floor.sWidth,
        floor.dY,
        floor.sWidth,
        floor.sHeight
      );
    },
  };
  return floor;
}

const canvas = document.querySelector("canvas");
const contexto = canvas.getContext("2d");

const background = {
  sX: 390,
  sY: 0,
  sWidth: 275,
  sHeight: 204,
  dX: 0,
  dY: canvas.height - 204,
  draw() {
    contexto.fillStyle = "#70c5ce";
    contexto.fillRect(0, 0, canvas.width, canvas.height);
    contexto.drawImage(
      sprites,
      background.sX,
      background.sY,
      background.sWidth,
      background.sHeight,
      background.dX,
      background.dY,
      background.sWidth,
      background.sHeight
    );
    contexto.drawImage(
      sprites,
      background.sX,
      background.sY,
      background.sWidth,
      background.sHeight,
      background.dX + background.sWidth,
      background.dY,
      background.sWidth,
      background.sHeight
    );
  },
};
const getReady = {
  sX: 134,
  sY: 0,
  sWidth: 174,
  sHeight: 152,
  dX: canvas.width / 2 - 174 / 2,
  dY: 50,
  draw() {
    contexto.drawImage(
      sprites,
      getReady.sX,
      getReady.sY,
      getReady.sWidth,
      getReady.sHeight,
      getReady.dX,
      getReady.dY,
      getReady.sWidth,
      getReady.sHeight
    );
  },
};

const global = {};
let activeScreen = {};

function changeScreen(newScreen) {
  activeScreen = newScreen;

  if (activeScreen.start) {
    activeScreen.start();
  }
}

const screens = {
  home: {
    start() {
      global.flappyBird = createBird();
      global.floor = createFloor();
    },
    draw() {
      background.draw();
      global.flappyBird.draw();
      global.floor.draw();
      getReady.draw();
    },
    click() {
      changeScreen(screens.game);
    },
    refresh() {
      global.floor.refresh();
    },
  },
  game: {
    draw() {
      background.draw();
      global.flappyBird.draw();
      global.floor.draw();
    },
    refresh() {
      global.flappyBird.refresh();
    },
    click() {
      global.flappyBird.jump();
    },
  },
};

function loop() {
  activeScreen.draw();
  activeScreen.refresh();
  frames = frames + 1;
  requestAnimationFrame(loop);
}

window.addEventListener("click", function () {
  if (activeScreen.click) {
    activeScreen.click();
  }
});

changeScreen(screens.home);
loop();
