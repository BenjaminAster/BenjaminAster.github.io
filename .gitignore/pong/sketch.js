

let unit;

let leftRacket;
let rightRacket;
let ball;
let ballImg;

let score = 0;
let gameOver = false;

let keyProfiles;

let keyProfileNum = 0;
let keys;

let looping = true;

function setup() {
  createCanvas(windowWidth, windowHeight);

  windowResized();

  keyProfiles = [
    {
      name: "ED-IK",
      leftUp: unchar('E'),
      leftDown: unchar('D'),
      rightUp: unchar('I'),
      rightDown: unchar('K')
    },
    {
      name: "WD-OK",
      leftUp: unchar('W'),
      leftDown: unchar('D'),
      rightUp: unchar('O'),
      rightDown: unchar('K')
    },
    {
      name: "WS-↑↓",
      leftUp: unchar('W'),
      leftDown: unchar('S'),
      rightUp: UP_ARROW,
      rightDown: DOWN_ARROW
    },
  ];

  keys = keyProfiles[keyProfileNum];

  ball = new Ball();
  leftRacket = new Racket("left");
  rightRacket = new Racket("right");


}

function draw() {
  background(0);

  if (keyIsDown(keys.leftUp)) {
    leftRacket.move(-1);
  }
  if (keyIsDown(keys.leftDown)) {
    leftRacket.move(1);
  }
  if (keyIsDown(keys.rightUp)) {
    rightRacket.move(-1);
  }
  if (keyIsDown(keys.rightDown)) {
    rightRacket.move(1);
  }

  ball.update();

  rightRacket.draw();
  leftRacket.draw();
  ball.draw();

  fill(255);
  stroke(0);
  strokeWeight(5);
  if (gameOver) {
    textAlign(CENTER, CENTER);
    textSize(unit * 9);
    text("Game Over", width / 2, height / 2 - unit * 7);
    textSize(unit * 4);
    text(`Your score was ${score}`, width / 2, height / 2);
    textSize(unit * 3);
    text("Press R to retry", width / 2, height / 2 + unit * 5);
  } else {
    textAlign(LEFT, TOP);
    text(`Score: ${score}`, unit, unit);
  }

  textSize(unit * 2);
  textAlign(RIGHT, TOP);
  text(`Control rackets with ${keys.name} – Press # to change.`, width - unit, unit);
  textAlign(LEFT, BOTTOM);
  text("© 2020 Benjamin Aster", unit, height - unit);




}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);

  unit = min(width, height) / 100;
}



function keyTyped() {
  if (key == 'r') {
    ball = new Ball();
    leftRacket = new Racket("left");
    rightRacket = new Racket("right");
    score = 0;
    gameOver = false;
  } else if (key == '#') {
    keyProfileNum++;
    keyProfileNum %= keyProfiles.length;
    keys = keyProfiles[keyProfileNum];
  }
  return false;
}

function keyReleased() {
  if (keyCode == ESCAPE) {
    looping = !looping;
    looping ? loop() : noLoop();
  }
}


