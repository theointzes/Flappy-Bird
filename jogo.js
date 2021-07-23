console.log("Flappy Bird");

const sprites = new Image();
sprites.src = "./sprites.png";

const canvas = document.querySelector("canvas");
const contexto = canvas.getContext("2d");
const flappyBird = {
  sX: 0,
  sY: 0,
  sWidth: 33,
  sHeight: 24,
  dX: 0,
  dY: 0,
  gravity: 0.25,
  speed: 0,
  refresh() {
    flappyBird.speed = flappyBird.speed + flappyBird.gravity;
    flappyBird.dY = flappyBird.dY + flappyBird.speed;
    flappyBird.dX = flappyBird.dX + 5;
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

function loop() {
  flappyBird.refresh();
  background.draw();
  flappyBird.draw();
  floor.draw();
  requestAnimationFrame(loop);
}

loop();
