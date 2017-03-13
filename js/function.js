Tmpl = {

	game : function() {
		// Take Canvas element
		var canvas = document.getElementById('newCanvas');
		var context = canvas.getContext('2d');

		// The definition of variables 
		var x = canvas.width/2;
		var y = canvas.height - 30;
		var dx = 2;
		var dy = -2;
		var ballR = 10;
		var paddleWidth = 70;
		var paddleHeight = 10;
		var paddleX = (canvas.width - paddleWidth)/2;
		var rightPress = false;
		var leftPress = false;
		var brickRow = 4;
		var brickColumn = 6;
		var brickWidth = 70;
		var brickHeight = 20;
		var brickMargin = 10;
		var brickOffsetTop =  50;
		var brickOffsetLeft = 30;
		var score = 0;
		var lives = 3;

		// Giving value x, y to bricks
		var bricks = [];
		for (c=0; c<brickColumn; c++) {
			bricks[c] = [];
			for (r=0; r<brickRow; r++) {
				bricks[c][r] = {x: 0, y:0, status: 1}; 
			}
		}

		// Button pressed detection
		document.addEventListener('keydown', keyDownDetection);
		document.addEventListener('keyup', keyUpDetection);

		// Building bricks 
		function Bricks() {
			for (c=0; c<brickColumn; c++) {
				for (r=0; r<brickRow; r++) {
					if(bricks[c][r].status == 1) {
						var brickX = (c*(brickWidth+brickMargin))+brickOffsetLeft;
						var brickY = (r*(brickHeight+brickMargin))+brickOffsetTop;
						bricks[c][r].x = brickX;
						bricks[c][r].y = brickY;
						context.beginPath();
						context.rect(brickX, brickY, brickWidth, brickHeight);
						context.fillStyle = "#73644b";
						context.fill();
						context.closePath();
					}
				}
			}
		}

		// Pressed keys detection
		function keyDownDetection(e) {
			if(e.keyCode == 39) {
				rightPress = true;
			} else if(e.keyCode == 37) {
				leftPress = true;
			}
		}

		function keyUpDetection(e) {
			if (e.keyCode == 39) {
				rightPress = false;
			} else if(e.keyCode == 37) {
				leftPress = false;
			}
		}

		// Create ball 
		function Ball() {
			context.beginPath();
			context.arc(x, y, ballR, 0, Math.PI*2);
			context.fillStyle = '#73644b';
			context.fill();
			context.closePath();
		};

		// Create Paddle 
		function Paddle() {
			context.beginPath();
			context.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
			context.fillStyle = '#73644b';
			context.fill();
			context.closePath();
		}

		// Coliision detection 
		function collision() {
			for(c=0; c<brickColumn; c++) {
				for(r=0; r<brickRow; r++) {
					var b = bricks[c][r];
					if(b.status == 1) {
						if(x > b.x && x < b.x+brickWidth && y > b.y - ballR && y < b.y+brickHeight + ballR) {
							dy = -dy;
							b.status = 0;
							score++;
							if(score == brickColumn*brickRow) {
								alert('CONGRATULATIONS, YOU WON!');
								document.location.reload();
							}
						}
					}
				}
			}
		}

		// Score label 
		function Score() {
			context.font = "16px Arial";
			context.fillStyle = "#fff";
			context.fillText("Score: "+score, canvas.width-80, 25);
		}

		// Lives label
		function Lives() {
			context.font = "16px Arial";
			context.fillStyle = "#fff";
			context.fillText("Lives: "+lives, 13, 25);
		}

		// Give the game life
		function draw() {
			context.clearRect(0,0, canvas.width, canvas.height);
			Bricks();	
			Ball();
			Paddle();
			Score();
			Lives();
			collision();

			if(y + dy < ballR) {
				dy = -dy;
			} else if (y + dy > canvas.height - ballR) {
				if(x > paddleX && x < paddleX + paddleWidth) {
					dy = -dy;
				} else {
					lives--;
					if(!lives) {
						alert('Game Over!');
					 	document.location.reload();
					} else {
						 x = canvas.width/2;
						 y = canvas.height-30;
						 dx = 2;
						 dy = 2;
						 paddleX = (canvas.width-paddleWidth)/2;
					}
				}
			}

			if(x + dx < ballR || x + dx > canvas.width-ballR) {
				dx = -dx;
			}

			if (rightPress && paddleX < canvas.width - paddleWidth) {
				paddleX += 5;
			} else if (leftPress && paddleX > 0) {
				paddleX -= 5;
			}

			x += dx;
			y += dy;
		}

		// Mouse controll 
		document.addEventListener("mousemove", mouseMoveHandler);

		function mouseMoveHandler(e) {
			var relativeX = e.clientX - canvas.offsetLeft;
			if (relativeX > 0+paddleWidth/2 && relativeX < canvas.width - paddleWidth/2) {
				paddleX  = relativeX - paddleWidth/2;
			}
		}

		setInterval(draw, 8);
		var hidden = false;
		function btnHide() {
			// hidden = !hidden;
			if (!hidden) {
				document.getElementById('btnContainer').style.visibility = 'hidden';
			} else {
				document.getElementById('btnContainer').style.visibility = 'visible';
			}
		}
		btnHide();
	} 
}
