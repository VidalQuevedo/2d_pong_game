(function(){

	'use strict';

	var canvas = document.getElementById('2d-pong-game-canvas');
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	var ballX = canvas.width / 2;
	var ballY = canvas.height / 2;
	var ballRadius = 10;
	var ctx = canvas.getContext('2d');
	var dx = 3;
	var dy = -3;

	init();

	
	////////////////////


	function ballCollisionDetection() {
		// ceiling and floor 
		if (ballY - ballRadius <= 0 || ballY + ballRadius >= canvas.height) {
			dy = -dy;
		}
	}	

	function clearCanvas() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
	}

	function draw() {
		clearCanvas();
		drawNetLine();
		drawBall();
		ballCollisionDetection();
		requestAnimationFrame(draw);
	}

	function drawBall() {
		ctx.beginPath();
		ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
		ctx.fillStyle = '#CCCCCC';
		ctx.fill();
		ctx.closePath();

		// update ball coordinates
		ballX += dx;
		ballY += dy;
	}

	function drawNetLine() {
		ctx.beginPath();
		ctx.setLineDash([10, 10]);
		ctx.moveTo(canvas.width / 2, 0);
		ctx.lineTo(canvas.width / 2, canvas.height);
		ctx.strokeStyle = '#CCCCCC';
		ctx.stroke();
		ctx.closePath();
	}

	function init() {
		draw();
	}

})();