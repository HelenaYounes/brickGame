
//is it okay to have this many variables?

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var ballX = 200
var ballY = 100;
var paddleX = canvas.width/2;
var paddleY = canvas.height - 50;
var paddleWidth = 100;
var paddleHeight = 20;
var col = 4;
var row = 14;
var brickX = 0;
var brickY = 0;
var brickLength =50;
var brickHeight = 20;
var brickPadding = 4;
var veloX = 2;
var veloY = 2;
var right = false;
var left = false;
var brick = [];
for ( i = 0; i < col; i++) {
  brick[i] = [];
  for (j = 0; j <row; j++) {
    brick[i][j] = {
      x: 0, y: 0
    };
  }
}

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
  for ( i = 0; i < col; i++) {
    drawCol();
  }
}

function drawRow(c){
  for ( i = 0; i <= row; i++) {
    drawBrick();
    brickX += brickLength + brickPadding;
  }
  brickX = 0;
}

function drawCol(){
  for ( c = 0; c <= col; c++) {
    drawRow();
    brickY += brickHeight + brickPadding;
  }
  brickY = 0;
}

function drawBrick(){
  ctx.beginPath();
  ctx.fillStyle = "#FF0000";
  ctx.fillRect(brickX, brickY, brickLength, brickHeight);
  ctx.closePath();
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
  ballX += veloX;
  ballY += veloY;
}

function bounceWall(){
  if (ballX >= canvas.width || ballX <= 0){
    veloX =  - veloX;
  }
  else if (ballY <= 0){
    veloY =  - veloY;
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
      veloX =  - veloX - 2;
      veloY =  - veloY;
    }
  }
  else if (ballX > paddleX + paddleWidth/2  && ballX < paddleX + paddleWidth){
    if (ballY >= paddleY && ballY <= paddleY + paddleHeight) {
      veloX = - veloX + 2;
      veloY =  - veloY;
    }
  }
  else if (ballX == paddleX + paddleWidth/2  && ballX == paddleX + paddleWidth){
    if (ballY >= paddleY && ballY <= paddleY + paddleHeight) {
      veloX =  - veloX ;
      veloY =  - veloY;
    }
  }
}

window.addEventListener('keydown', keyDown, false);
window.addEventListener('keyup', keyUp, false);
setInterval(draw,5);
