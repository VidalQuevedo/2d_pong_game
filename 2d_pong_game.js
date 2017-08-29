(function(){

	'use strict';

	var canvas = document.getElementById('2d-pong-game-canvas');
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	var ballX = canvas.width / 2;
	var ballY = canvas.height / 2;
	var ballRadius = 10;
	var ctx = canvas.getContext('2d');
	var dx = 5;
	var dy = -5;
	var isUpKeyPressed = false;
	var isDownKeyPressed = false;
	var isWKeyPressed = false;
	var isSKeyPressed = false;
	var paddleHeight = 90;
	var paddleWidth = 10;
	var paddle1X = 0;
	var paddle1Y = (canvas.height - paddleWidth) / 2;	
	var paddle2X = canvas.width - paddleWidth;
	var paddle2Y = (canvas.height - paddleWidth) / 2;
	var p1Score = 0;
	var p2Score = 0;
	var roundCount = 1;

	init();

	
	////////////////////


	function addEventListeners() {
		document.addEventListener('keydown', handleKeyDown, false);
		document.addEventListener('keyup', handleKeyUp, false);
	}

	function ballCollisionDetection() {
		
		// ceiling and floor 
		if (ballY - ballRadius < 0 || ballY + ballRadius > canvas.height) {
			dy = -dy;
		}

		// paddle1
		if (ballX - ballRadius <= paddle1X) {
			if (ballY > paddle1Y && ballY < paddle1Y + paddleHeight) {
				dx = -dx;
			} else {
				p1Score++;
				startNewRound();
			}
		} 

		// paddle2
		if (ballX + ballRadius >= paddle2X) {
			if (ballY > paddle2Y && ballY < paddle2Y + paddleHeight) {
				dx = -dx;
			} else {
				p2Score++;
				startNewRound();
			}
		}

	}	

	function clearCanvas() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
	}

	function draw() {
		addEventListeners();
		clearCanvas();
		drawNetLine();
		drawBall();
		drawPaddles();
		drawScores();
		updatePaddlePosition();
		ballCollisionDetection();
		requestAnimationFrame(draw);
	}

	function drawBall() {
		ctx.beginPath();
		ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
		ctx.fillStyle = '#000000';
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
		ctx.strokeStyle = '#000000';
		ctx.stroke();
		ctx.closePath();
	}

	function drawPaddles() {
		// paddle 1
		ctx.beginPath();
		ctx.rect(paddle1X, paddle1Y, paddleWidth, paddleHeight);
		ctx.fillStyle = '#000000';
		ctx.fill();
		ctx.closePath();

		// paddle 2
		ctx.beginPath();
		ctx.rect(paddle2X, paddle2Y, paddleWidth, paddleHeight);
		ctx.fillStyle = '#000000';
		ctx.fill();
		ctx.closePath();
	}

	function drawScores() {
		// P1 Score
		ctx.beginPath();
		ctx.font = '64px \'Courier New\'';
		ctx.fillStyle = '#000000';
		ctx.fillText(p1Score, canvas.width / 2 - 104, 64);
		ctx.closePath();

		// P2 Score
		ctx.beginPath();
		ctx.font = '64px \'Courier New\'';
		ctx.fillStyle = '#000000';
		ctx.fillText(p2Score, canvas.width / 2 + 64, 64);
		ctx.closePath()		
	}

	function handleKeyDown($event) {
		switch($event.keyCode) {
			case 38:
			isUpKeyPressed = true;
			break;
			case 40:
			isDownKeyPressed = true;
			break;
			case 87:
			isWKeyPressed = true;
			break;
			case 83:
			isSKeyPressed = true;
			break;
		}
	}

	function handleKeyUp($event) {
		switch($event.keyCode) {
			case 38:
			isUpKeyPressed = false;
			break;
			case 40:
			isDownKeyPressed = false;
			break;
			case 87:
			isWKeyPressed = false;
			break;
			case 83:
			isSKeyPressed = false;
			break;
		}
	}

	function init() {
		draw();
	}

	function startNewRound() {
		roundCount++;
		ballX = canvas.width / 2;
		ballY = canvas.height / 2;
		dx = -dx;
		dy = -dy;

		// increase speed
		if (roundCount % 3 === 0) {
			dx = (dx < 0) ? dx - 0.5 : dx + 0.5;
			dy = (dy < 0) ? dy - 0.5 : dy + 0.5;
		}
	}

	function updatePaddlePosition() {

		// paddle 1
		if (isWKeyPressed && paddle1Y > 0) {
			paddle1Y -= 7;
		} else if (isSKeyPressed && paddle1Y + paddleHeight < canvas.height) {
			paddle1Y += 7;
		} 
		// paddle 2
		if (isUpKeyPressed && paddle2Y > 0) {
			paddle2Y -= 7;
		} else if (isDownKeyPressed && paddle2Y + paddleHeight < canvas.height) {
			paddle2Y += 7;
		} 
	}


})();