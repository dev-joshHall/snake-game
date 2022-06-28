import React, { useEffect } from "react";
import Sketch from "react-p5";

const SnakeCanvas = (props) => {
  var bgImg;

  var snake = {
    pieces: [
      { x: 20, y: 0 },
      { x: 0, y: 0 },
      { x: -20, y: 0 },
    ],
    score: 0,
    xvel: 20,
    yvel: 0,
  };

  var food = {
    x: Math.floor(Math.random() * 20) * 20,
    y: Math.floor(Math.random() * 20) * 20,
  };

  const changeFood = () => {
    food.x = Math.floor(Math.random() * 20) * 20;
    food.y = Math.floor(Math.random() * 20) * 20;
  };

  const checkEaten = () => {
    var head = snake.pieces[0];
    if (head.x === food.x && head.y === food.y) {
      return true;
    }
    return false;
  };

  const checkWallCollide = () => {
    var head = snake.pieces[0];
    if (head.x >= 400 || head.x < 0) {
      return true;
    }
    if (head.y >= 400 || head.y < 0) {
      return true;
    }
    return false;
  };

  const checkSelfCollide = () => {
    var head = snake.pieces[0];
    for (let i = 1; i < snake.pieces.length; i++) {
      if (head.x === snake.pieces[i].x && head.y === snake.pieces[i].y) {
        return true;
      }
    }
    return false;
  };

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(400, 400).parent(canvasParentRef);
    p5.frameRate(5);
    bgImg = p5.loadImage(require("./leaves.png"));
  };

  useEffect(() => {
    const keyDownHandler = (event) => {
      if (event.key === "ArrowLeft" && snake.xvel !== 20) {
        snake.xvel = -20;
        snake.yvel = 0;
      }
      if (event.key === "ArrowRight" && snake.xvel !== -20) {
        snake.xvel = 20;
        snake.yvel = 0;
      }
      if (event.key === "ArrowUp" && snake.yvel !== 20) {
        snake.xvel = 0;
        snake.yvel = -20;
      }
      if (event.key === "ArrowDown" && snake.yvel !== -20) {
        snake.xvel = 0;
        snake.yvel = 20;
      }
    };
    document.addEventListener("keydown", keyDownHandler);
    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  });

  const draw = (p5) => {
    p5.background(bgImg);
    if (checkWallCollide() || checkSelfCollide()) {
      p5.fill(255); // change text color to white
      p5.text("Game Over", 130, 180);
      p5.text("Score: " + snake.score, 145, 210);
      return false;
    }

    var eatFood = checkEaten();
    if (eatFood) {
      var tail = snake.pieces[snake.pieces.length - 1];
      snake.pieces.push({ x: tail.x - snake.xvel, y: tail.y - snake.yvel });
      snake.score++;
      changeFood();
    }

    p5.fill(0, 200, 50); // change text color to white
    // draw the snake using position
    for (const section of snake.pieces) {
      p5.rect(section.x, section.y, 20, 20);
    }

    var head = snake.pieces[0];
    // add a new head 20 spaces in front
    snake.pieces.unshift({ x: head.x + snake.xvel, y: head.y + snake.yvel });
    snake.pieces.pop(); // delete the tail

    p5.rect(food.x, food.y, 20, 20);

    p5.fill(255);
    p5.text("Score: " + snake.score, 10, 20);
    p5.textSize(25);
  };

  return <Sketch setup={setup} draw={draw} />;
};

export default SnakeCanvas;
