var onLoad = function(){
  var canvas = document.getElementById("myCanvas");
  var ctx = canvas.getContext("2d");
  var ballX = 200
  var ballY = 100;

  ctx.fillStyle = "#FF0000";
  ctx.fillRect(200,280,100,50);
  setInterval(draw, 10);
};



function draw(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  beginPath();
  ctx.arc(ballX, ballY, 10, 0 , Math.PI*2);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
  ballX += 2;
  ballY += 2;
}


window.addEventListener('load', onLoad);
