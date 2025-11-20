        const hero = document.getElementById('hero');
        const gameContainer = document.getElementById('game-container');
        const scoreDisplay = document.getElementById('score-board');
        const speedDisplay = document.getElementById('speed-meter');
        const gameOverScreen = document.getElementById('game-over');

        let isJumping = false;
        let score = 0;
        let gameSpeed = 5; 
        let gravity = 0.9;
        let isGameOver = false;
        let obstacleTimer;
        let obstacles = [];
        
       
        document.addEventListener('keydown', function(event) {
            if ((event.code === 'Space' || event.code === 'ArrowUp') && !isJumping && !isGameOver) {
                jump();
            }
        });

        function jump() {
            isJumping = true;
            let position = 0;
            
            
            let upInterval = setInterval(() => {
                if (position >= 150) { 
                    clearInterval(upInterval);
                    
                    let downInterval = setInterval(() => {
                        if (position <= 0) {
                            clearInterval(downInterval);
                            isJumping = false;
                            position = 0;
                        } else {
                            position -= 5;
                            hero.style.bottom = (50 + position) + 'px';
                        }
                    }, 20);
                } else {
                    position += 10; 
                    hero.style.bottom = (50 + position) + 'px';
                }
            }, 20);
        }

        function createObstacle() {
            if (isGameOver) return;

            const obstacle = document.createElement('div');
            obstacle.classList.add('obstacle');
            obstacle.style.left = '800px'; 
            gameContainer.appendChild(obstacle);
            obstacles.push(obstacle);

           
            let randomTime = Math.random() * 2000 + (10000 / (gameSpeed * 2)); 
            obstacleTimer = setTimeout(createObstacle, randomTime);
        }

        function updateGame() {
            if (isGameOver) return;

            
            score++;
            scoreDisplay.innerText = "Score: " + Math.floor(score / 10);
            
            
            if (score % 500 === 0) {
                gameSpeed += 1;
                speedDisplay.innerText = "Vitesse: Mach " + (gameSpeed - 4);
                
                hero.style.boxShadow = `-5px 0 ${10 + gameSpeed}px #ffd700, -10px 0 ${20 + gameSpeed}px #e70000`;
            }

            
            if (score % 5 === 0) createTrail();

           
            obstacles.forEach((obs, index) => {
                let obsLeft = parseInt(window.getComputedStyle(obs).getPropertyValue("left"));

                if (obsLeft < -30) {
                 
                    obs.remove();
                    obstacles.splice(index, 1);
                } else {
                  
                    obs.style.left = (obsLeft - gameSpeed) + 'px'; 


                    let heroBottom = parseInt(window.getComputedStyle(hero).getPropertyValue("bottom"));
                    let heroLeft = 50; 

                    
                    if (obsLeft < heroLeft + 40 && obsLeft > heroLeft && heroBottom < 100) {
                        gameOver();
                    }
                }
            });

            requestAnimationFrame(updateGame);
        }

        function createTrail() {
            const trail = document.createElement('div');
            trail.classList.add('trail');
            trail.style.left = (50 - gameSpeed) + 'px';
            trail.style.bottom = hero.style.bottom;
            trail.style.opacity = 0.5;
            gameContainer.appendChild(trail);

        
            let fadeEffect = setInterval(function () {
                if (!trail.style.opacity) {
                    trail.style.opacity = 0.5;
                }
                if (trail.style.opacity > 0) {
                    trail.style.opacity -= 0.1;
                    trail.style.left = (parseInt(trail.style.left) - gameSpeed) + 'px';
                } else {
                    clearInterval(fadeEffect);
                    trail.remove();
                }
            }, 50);
        }

        function gameOver() {
            isGameOver = true;
            clearTimeout(obstacleTimer);
            document.getElementById('final-score').innerText = "Score Final: " + Math.floor(score / 10);
            gameOverScreen.style.display = 'block';
        }

        function resetGame() {

            obstacles.forEach(obs => obs.remove());
            obstacles = [];
            const trails = document.querySelectorAll('.trail');
            trails.forEach(t => t.remove());

            isGameOver = false;
            score = 0;
            gameSpeed = 5;
            gameOverScreen.style.display = 'none';
            speedDisplay.innerText = "Vitesse: Mach 1";
            
            createObstacle();
            updateGame();
        }


        createObstacle();
        updateGame();