console.log("Flappy Bird");

const hitSound = new Audio();
hitSound.src = "./efeitos/hit.wav";
const sprites = new Image();
sprites.src = "./sprites.png";

function floorCollision() {
  let flappyBirdY = global.flappyBird.dY + global.flappyBird.sHeight;
  let floorY = floor.dY;
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
      if (floorCollision(flappyBird, floor)) {
        hitSound.play();
        setTimeout(() => {
          changeScreen(screens.home);
        }, 500);
        return;
      }

      flappyBird.speed = flappyBird.speed + flappyBird.gravity;
      flappyBird.dY = flappyBird.dY + flappyBird.speed;
    },
    draw() {
      contexto.drawImage(
        sprites,
        flappyBird.sX,
        flappyBird.sY,
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

const canvas = document.querySelector("canvas");
const contexto = canvas.getContext("2d");
const floor = {
  sX: 0,
  sY: 610,
  sWidth: 224,
  sHeight: 112,
  dX: 0,
  dY: canvas.height - 112,
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
    },
    draw() {
      background.draw();
      global.flappyBird.draw();
      floor.draw();
      getReady.draw();
    },
    refresh() {},
    click() {
      changeScreen(screens.game);
    },
  },
  game: {
    draw() {
      background.draw();
      global.flappyBird.draw();
      floor.draw();
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
  requestAnimationFrame(loop);
}

window.addEventListener("click", function () {
  if (activeScreen.click) {
    activeScreen.click();
  }
});

changeScreen(screens.home);
loop();
