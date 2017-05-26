
//is it okay to have this many variables?

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var bricks = [];
var ballX = 200
var ballY = 100;
var paddleX = canvas.width/2;
var paddleY = canvas.height - 50;
var paddleWidth = 100;
var paddleHeight = 20;
var col = 4;
var row = 14;
var brickConfig = {
  width: 50,
  height: 20,
  padding: 4,
}
var velX =2;
var velY =2;
var brickX = 0;
var brickY = 0;
var right = false;
var left = false;


function draw(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  drawBall();
  drawPaddle();
  bounceWall();
  movePaddle();
  drawWall();
  bouncePaddle();
}
function drawWall(){
  for ( i = 0; i < bricks.length; i++) {
    drawBrick(bricks[i]);
  }
}

function drawBrick(brick){
  ctx.beginPath();
  ctx.fillStyle = "#FF0000";
  ctx.fillRect(brick.x, brick.y, brick.width, brick.height);
  ctx.closePath();
}
function createWall() {
  createPyramidWall(4);
}

function getRowWidth(numBricks){
  return totalBrickWidth(numBricks) + totalBrickPadding(numBricks);
}

function totalBrickWidth(numBricks){
  return brickConfig.width * numBricks;
}

function totalBrickPadding(numBricks){
  return brickConfig.padding * (numBricks - 1);
}

function getStartX(numBricks) {
  var totalWallWidth = getRowWidth(numBricks);
  return ((canvas.width - totalWallWidth) / 2) - (brickConfig.width/2);
}

function getStartY(numRow){
  return (brickConfig.height + brickConfig.padding) * numRow;
}

function createCenteredRow(startY, numBricks){
  var currentX = getStartX( numBricks);
  for (var i = 0; i < numBricks; i++) {
    var brick = {
      x: currentX,
      y: startY,
      width: brickConfig.width,
      height: brickConfig.height,
    };
    bricks.push(brick);
    currentX += brick.width + brickConfig.padding;
  }
}

function createPyramidWall( height) {
  for (var row = 0; row < height; row++) {
    var numBricks = height - row;
    var startY = getStartY(row);
    createCenteredRow(startY, numBricks);
  }
}


function drawPaddle(){
  ctx.beginPath();
  ctx.fillStyle = "#FF0000";
  ctx.fillRect(paddleX, paddleY, paddleWidth, paddleHeight);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

function drawBall(){
  ctx.beginPath();
  ctx.fillStyle = "#FF0000";
  ctx.arc(ballX, ballY, 10, 0 , Math.PI*2);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
  ballX += velX;
  ballY += velY;
}

function bounceWall(){
  if (ballX >= canvas.width || ballX <= 0){
    velX =  - velX;
  }
  else if (ballY <= 0){
    velY =  - velY;
  }
}

function keyDown(e){
  if (e.keyCode == 37){
    left = true;
  }
  else if (e.keyCode == 39) {
    right = true;
  }
}

function keyUp(e){
  if (e.keyCode == 37) {
    left = false;
  }
  else if (e.keyCode == 39) {
    right = false;
  }
}

function  movePaddle(){
  if (right){
    paddleX += 5;
    checkBounds(paddleX);
  }
  else if (left) {
    paddleX -= 5;
    checkBounds(paddleX);
  }
}

function checkBounds(x){
  if (x >= canvas.width - paddleWidth ) {
    paddleX = canvas.width - paddleWidth;
  }
  else if ( x <= 0) {
    paddleX = 0;
  }
}

function bouncePaddle(){
  if (ballX >= paddleX && ballX < paddleX + paddleWidth/2){
    if (ballY >= paddleY && ballY <= paddleY + paddleHeight) {
      velX =  - velX - 2;
      velY =  - velY;
    }
  }
  else if (ballX > paddleX + paddleWidth/2  && ballX < paddleX + paddleWidth){
    if (ballY >= paddleY && ballY <= paddleY + paddleHeight) {
      velX = - velX + 2;
      velY =  - velY;
    }
  }
  else if (ballX == paddleX + paddleWidth/2  && ballX == paddleX + paddleWidth){
    if (ballY >= paddleY && ballY <= paddleY + paddleHeight) {
      velX =  - velX ;
      velY =  - velY;
    }
  }
}


window.addEventListener('keydown', keyDown, false);
window.addEventListener('keyup', keyUp, false);

createWall();
setInterval(draw,5);
