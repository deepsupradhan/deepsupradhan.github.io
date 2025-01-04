/*
    Copyright © 2025 Subhadeep. All Rights Reserved.
    This code is proprietary and may not be reproduced, distributed, or used without permission.
*/

const canvas = document.getElementById("snakeGame");
const ctx = canvas.getContext("2d");

const scale = 20; // Size of each cell
const rows = canvas.height / scale;
const columns = canvas.width / scale;

// Load images
const snakeHeadImg = new Image();
snakeHeadImg.src = "snakeHead.png"; // Replace with the path to your snake head image

const snakeBodyImg = new Image();
snakeBodyImg.src = "snakeBody.png"; // Replace with the path to your snake body image (optional)

// Load sounds
const eatSound = new Audio("eat.mp3");
const gameOverSound = new Audio("gameOver.mp3");

let snake;
let fruit;
let score;

(function setup() {
  snake = new Snake();
  fruit = new Fruit();
  score = 0;

  fruit.randomize();
  window.setInterval(gameLoop, 100);

  // Add keyboard controls
  window.addEventListener("keydown", (e) => {
    const direction = e.key.replace("Arrow", "").toLowerCase();
    snake.changeDirection(direction);
  });

  // Add touch controls for mobile
  document
    .getElementById("up")
    .addEventListener("click", () => snake.changeDirection("up"));
  document
    .getElementById("down")
    .addEventListener("click", () => snake.changeDirection("down"));
  document
    .getElementById("left")
    .addEventListener("click", () => snake.changeDirection("left"));
  document
    .getElementById("right")
    .addEventListener("click", () => snake.changeDirection("right"));
})();

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  snake.move();
  snake.draw();
  fruit.draw();

  if (snake.eat(fruit)) {
    eatSound.play(); // Play sound when eating fruit
    fruit.randomize();
    score++;
  }

  if (snake.checkCollision()) {
    gameOverSound.play(); // Play game over sound
    alert("Game Over! Your score: " + score);
    setup();
  }

  // Display the score
  ctx.fillStyle = "white";
  ctx.font = "20px Arial";
  ctx.fillText("Score: " + score, 10, 20);
}

function Snake() {
  this.body = [{ x: 5, y: 5 }]; // Initial position of the snake
  this.direction = "right";

  this.draw = function () {
    this.body.forEach((segment, index) => {
      if (index === 0) {
        // Draw the head image for the first segment
        ctx.drawImage(
          snakeHeadImg,
          segment.x * scale,
          segment.y * scale,
          scale,
          scale
        );
      } else if (snakeBodyImg.complete) {
        // Draw the body image for the rest of the segments (optional)
        ctx.drawImage(
          snakeBodyImg,
          segment.x * scale,
          segment.y * scale,
          scale,
          scale
        );
      } else {
        // Fallback to rectangles for the body
        ctx.fillStyle = "lime";
        ctx.fillRect(segment.x * scale, segment.y * scale, scale, scale);
      }
    });
  };

  this.move = function () {
    let head = { ...this.body[0] };

    if (this.direction === "right") head.x++;
    if (this.direction === "left") head.x--;
    if (this.direction === "up") head.y--;
    if (this.direction === "down") head.y++;

    this.body.unshift(head);
    this.body.pop();
  };

  this.changeDirection = function (direction) {
    if (this.direction === "right" && direction === "left") return;
    if (this.direction === "left" && direction === "right") return;
    if (this.direction === "up" && direction === "down") return;
    if (this.direction === "down" && direction === "up") return;

    this.direction = direction;
  };

  this.eat = function (fruit) {
    const head = this.body[0];
    return head.x === fruit.x && head.y === fruit.y;
  };

  this.checkCollision = function () {
    const head = this.body[0];

    // Check wall collision
    if (head.x < 0 || head.x >= columns || head.y < 0 || head.y >= rows) {
      return true;
    }

    // Check self collision
    for (let i = 1; i < this.body.length; i++) {
      if (head.x === this.body[i].x && head.y === this.body[i].y) {
        return true;
      }
    }

    return false;
  };
}

function Fruit() {
  this.randomize = function () {
    this.x = Math.floor(Math.random() * columns);
    this.y = Math.floor(Math.random() * rows);
  };

  this.draw = function () {
    ctx.fillStyle = "green";
    ctx.fillRect(this.x * scale, this.y * scale, scale, scale);
  };
}
