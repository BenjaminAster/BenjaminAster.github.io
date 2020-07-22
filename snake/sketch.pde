

boolean fullScreen = false;
boolean processing3D = false;
int wWidth; // the width of the window
int wHeight; // the height of the window
int cWidth;
int cHeight;
int cSize;
int minSideLength;
int maxSideLength;

color[][] screen;


final byte APPLE = byte(64);
final byte BORDER = byte(65);
final byte BODY = byte(66);
final byte HEAD = byte(67);
final byte EMPTY = byte(68);

PImage myHeadRight;
PImage myHeadUp;
PImage myHeadLeft;
PImage myHeadDown;
PImage elias;

int gridHeight = 30;  // inclusive border
int gridWidth = 30;
byte[][] grid = new byte[gridHeight][gridWidth];

boolean started = false;
int snakeFPS = 10;
long prevUpdate = 0;
boolean gameOver = false;
String causeOfDeath = "";
boolean appleEaten = false;
PVector applePos = new PVector(int(random(1, gridWidth - 1)), int(random(1, gridHeight - 1)));

String prevMouseLeft = "";

PVector dir = new PVector(1, 0);
PVector prevDir = new PVector();

int snakeLength = 5;
int snakeStartLength = snakeLength;
ArrayList <PVector> snake = new ArrayList <PVector>();




void setup()
{
	wHeight = document.documentElement.clientHeight - 8;
	wWidth = wHeight
	size(wWidth, wHeight);
  cSize = int(sqrt(wWidth * wHeight));
  cWidth = wWidth;
  cHeight = wHeight;

  minSideLength = min(cWidth, cHeight);
  maxSideLength = max(cWidth, cHeight);
	
  resetMatrix();
  colorMode(RGB);

  prevDir.x = dir.x;
  prevDir.y = dir.y;

  imageMode(CENTER);
  myHeadRight = loadImage("https://benjaminaster.github.io/media/my-head-right.png");
  myHeadUp = loadImage("https://benjaminaster.github.io/media/my-head-up.png");
  myHeadLeft = loadImage("https://benjaminaster.github.io/media/my-head-left.png");
  myHeadDown = loadImage("https://benjaminaster.github.io/media/my-head-down.png");
  elias = loadImage("https://benjaminaster.github.io/media/elias-face.png");

  for (int i = 0; i < snakeStartLength; i++) {
    snake.add(new PVector(int(gridWidth/2) - i, int(gridHeight/2)));
  }
}

void draw()
{
  background(0);
	/*
  if (mousePressed && mouseButton == RIGHT)
  {
    cWidth = mouseX;
    cHeight = mouseY;
    if (cWidth > wWidth)
    {
      cWidth = wWidth;
    }
    if (cHeight > wHeight)
    {
      cHeight = wHeight;
    }
    cSize = int(sqrt(cWidth * cHeight));
    minSideLength = min(cWidth, cHeight);
    maxSideLength = max(cWidth, cHeight);
  }
	*/

  stroke(#FF0000);
  strokeWeight(1);
  noFill();
  //rect(0, 0, cWidth - 1, cHeight - 1);




  if (started) {
    if (gameOver) {

      fill(255);
      textSize(min(cWidth, cHeight * 3) / 26);
      textAlign(CENTER, CENTER);
      text("Game Over: Du bist in " + causeOfDeath + " gestoßen.\nKlicke oder drücke r, um es erneut zu versuchen", cWidth/2, cHeight/2);
      if ((mousePressed && mouseButton == LEFT) || (keyPressed && key == 'r')) {
        gameOver = false;
        //println("not go");
        while (snake.size() > 0) {
          snake.remove(0);
        }
        for (int i = 0; i < snakeStartLength; i++) {
          snake.add(new PVector(int(gridWidth/2) - i, int(gridHeight/2)));
        }
        snakeLength = snakeStartLength;
        dir = new PVector(1, 0);
        prevDir = new PVector(1, 0);
      }
    } else {
      if (millis() >= prevUpdate + 1000.0 / snakeFPS) {


        snake.add(0, new PVector(snake.get(0).x + dir.x, snake.get(0).y + dir.y));

        if (snake.size() > snakeLength) {
          snake.remove(snake.size() - 1);
        }

        prevDir.x = dir.x;
        prevDir.y = dir.y;

        prevUpdate = millis();
      }


      for (int row = 0; row < gridHeight; row++) {
        for (int clm = 0; clm < gridWidth; clm++) {
          if (row > 0 && row < gridHeight - 1 && clm > 0 && clm < gridWidth - 1) {
            grid[row][clm] = EMPTY;
          } else {
            grid[row][clm] = BORDER;
          }
        }
      }
      if (appleEaten == true) {
        do {
          applePos = new PVector(int(random(1, gridWidth - 1)), int(random(1, gridHeight - 1)));
        } while (grid[int(applePos.y)][int(applePos.x)] != EMPTY);
        snakeLength += 1;
        appleEaten = false;
      }
      grid[int(applePos.y)][int(applePos.x)] = APPLE;

      for (int i = 1; i < snake.size(); i++) {
        grid[int(snake.get(i).y)][int(snake.get(i).x)] = BODY;
      }

      if (grid[int(snake.get(0).y)][int(snake.get(0).x)] == BORDER) {
        //println("Game Over!");
        gameOver = true;
        causeOfDeath = "die Wand";
      } else if (grid[int(snake.get(0).y)][int(snake.get(0).x)] == BODY) {

        //println("Game Over!");
        gameOver = true;
        causeOfDeath = "dich selbst";
      } else {
        if (grid[int(snake.get(0).y)][int(snake.get(0).x)] == APPLE) {

          appleEaten = true;
        }
        grid[int(snake.get(0).y)][int(snake.get(0).x)] = HEAD;
      }
			
			
      for (int row = 0; row < gridHeight; row++) {
        for (int clm = 0; clm < gridWidth; clm++) {
					if ((row + clm) % 2 == 0) {
						noStroke();
						fill(20);
						rect(map(clm, 0.0, gridWidth, 0.0, cWidth), map(row, 0.0, gridHeight, 0.0, cHeight), float(cWidth) / gridWidth, float(cHeight) / gridHeight);
					}
				}
			}

      for (int row = 0; row < gridHeight; row++) {
        for (int clm = 0; clm < gridWidth; clm++) {
					
          if (grid[row][clm] != EMPTY) {
            String head = "";
            if (grid[row][clm] == BORDER) {
              strokeWeight(1);
              stroke(255);
              noFill();
              line(map(clm, 0.0, gridWidth, 0.0, cWidth), map(row, 0.0, gridHeight, 0.0, cHeight), map(clm + 1, 0.0, gridWidth, 0.0, cWidth), map(row + 1, 0.0, gridHeight, 0.0, cHeight));
              line(map(clm, 0.0, gridWidth, 0.0, cWidth), map(row + 1, 0.0, gridHeight, 0.0, cHeight), map(clm + 1, 0.0, gridWidth, 0.0, cWidth), map(row, 0.0, gridHeight, 0.0, cHeight));
            }
            if (grid[row][clm] == BODY) {
              strokeWeight(1);
              stroke(255);
              noFill();

              head = "Benjamin";
            }
            if (grid[row][clm] == HEAD) {
              strokeWeight(1);
              stroke(255);
              fill(0);
            }
            if (grid[row][clm] == APPLE) {
              strokeWeight(1);
              stroke(255);
              noFill();
              head = "Elias";
            }
            rect(map(clm, 0.0, gridWidth, 0.0, cWidth), map(row, 0.0, gridHeight, 0.0, cHeight), float(cWidth) / gridWidth, float(cHeight) / gridHeight);
            if (head == "Benjamin") {
              image(myHeadUp, map(clm + 0.5, 0.0, gridWidth, 0.0, cWidth), map(row + 0.5, 0.0, gridHeight, 0.0, cHeight), 1.5 * cWidth / gridWidth, 1.5 * cHeight / gridHeight);
            } else if (head == "Elias") {
              image(elias, map(clm + 0.5, 0.0, gridWidth, 0.0, cWidth), map(row + 0.5, 0.0, gridHeight, 0.0, cHeight), 2.5 * cWidth / gridWidth, 2.5 * cHeight / gridHeight);
            }
          }
        }
      }
      if (dir.x == 1 && dir.y == 0) {
        image(myHeadRight, map(snake.get(0).x + 0.5, 0.0, gridWidth, 0.0, cWidth), map(snake.get(0).y + 0.5, 0.0, gridHeight, 0.0, cHeight), 3.0 * cWidth / gridWidth, 3.0 * cHeight / gridHeight);
      } else if (dir.x == 0 && dir.y == -1) {
        image(myHeadUp, map(snake.get(0).x + 0.5, 0.0, gridWidth, 0.0, cWidth), map(snake.get(0).y + 0.5, 0.0, gridHeight, 0.0, cHeight), 3.0 * cWidth / gridWidth, 3.0 * cHeight / gridHeight);
      } else if (dir.x == -1 && dir.y == 0) {
        image(myHeadLeft, map(snake.get(0).x + 0.5, 0.0, gridWidth, 0.0, cWidth), map(snake.get(0).y + 0.5, 0.0, gridHeight, 0.0, cHeight), 3.0 * cWidth / gridWidth, 3.0 * cHeight / gridHeight);
      } else if (dir.x == 0 && dir.y == 1) {
        image(myHeadDown, map(snake.get(0).x + 0.5, 0.0, gridWidth, 0.0, cWidth), map(snake.get(0).y + 0.5, 0.0, gridHeight, 0.0, cHeight), 3.0 * cWidth / gridWidth, 3.0 * cHeight / gridHeight);
      }
    }
  } else {

    fill(255);
    textSize(min(cWidth, cHeight * 2.5) / 40);
    textAlign(CENTER, CENTER);
    text("Du bist ein hungriger Benjamin auf der Jagt nach frischen Eliasen.\nWenn du einen Elias frisst, wirst du ein Stück länger.\nAber Achtung: Du darfst nicht in die Wand\noder in dich selbst stoßen!", cWidth/2, 1.0 / 4 * cHeight);



    strokeWeight(4);

    float buttonBeginX = 1.0/4 * cWidth;
    float buttonEndX = 3.0/4 * cWidth;
    float buttonBeginY = 2.0/4 * cHeight;
    float buttonEndY = 3.0/4 * cHeight;

    textAlign(CENTER, CENTER);
    textSize(minSideLength/6);


    if ((mouseX >= buttonBeginX && mouseX <= buttonEndX) && (mouseY >= buttonBeginY && mouseY <= buttonEndY)) {
      if (mousePressed && mouseButton == LEFT) {
        stroke(0);
        fill(0);
        rect(buttonBeginX, buttonBeginY, buttonEndX - buttonBeginX, buttonEndY - buttonBeginY, minSideLength/30);

        fill(255);
        text("PLAY", (buttonBeginX + buttonEndX) / 2, (buttonBeginY + buttonEndY) / 2);
        prevMouseLeft = "Play";
      } else {
        if (prevMouseLeft == "Play") {
          started = true;
        } else {
          stroke(255);
          fill(255);
          rect(buttonBeginX, buttonBeginY, buttonEndX - buttonBeginX, buttonEndY - buttonBeginY, minSideLength/30);

          fill(0);
          text("PLAY", (buttonBeginX + buttonEndX) / 2, (buttonBeginY + buttonEndY) / 2);
        }
      }
    } else {
      stroke(255);
      fill(0);
      rect(buttonBeginX, buttonBeginY, buttonEndX - buttonBeginX, buttonEndY - buttonBeginY, minSideLength/30);

      fill(255);
      text("PLAY", (buttonBeginX + buttonEndX) / 2, (buttonBeginY + buttonEndY) / 2);
      prevMouseLeft = "";
    }
  }
	strokeWeight(1);
	stroke(255);
	noFill();
	rect(0, 0, wWidth - 1, wHeight - 1);
}



void keyPressed() {
  switch (keyCode) {
  case RIGHT:
    dir.x = 1;
    dir.y = 0;
    break;
  case UP:
    dir.x = 0;
    dir.y = -1;
    break;
  case LEFT:
    dir.x = -1;
    dir.y = 0;
    break;
  case DOWN:
    dir.x = 0;
    dir.y = 1;
    break;
  }

  if (int(prevDir.x + dir.x) == 0 && int(prevDir.y + dir.y) == 0) {
    dir.x = prevDir.x;
    dir.y = prevDir.y;
  }


  if (key == '+') {
    snakeLength++;
  }
}
