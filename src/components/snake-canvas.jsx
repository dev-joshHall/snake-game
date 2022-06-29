import React, { useEffect } from "react";
import Sketch from "react-p5";
import AlternateControls from "./alternate-controls";

const SnakeCanvas = (props) => {
  var bgImg;

  var gameStarted = false;

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
    if (!gameStarted) {
      return;
    }
    food.x = Math.floor(Math.random() * 20) * 20;
    food.y = Math.floor(Math.random() * 20) * 20;
  };

  const checkEaten = () => {
    if (!gameStarted) {
      return;
    }
    var head = snake.pieces[0];
    if (head.x === food.x && head.y === food.y) {
      return true;
    }
    return false;
  };

  const checkWallCollide = () => {
    if (!gameStarted) {
      return;
    }
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
    if (!gameStarted) {
      return;
    }
    var head = snake.pieces[0];
    for (let i = 1; i < snake.pieces.length; i++) {
      if (head.x === snake.pieces[i].x && head.y === snake.pieces[i].y) {
        return true;
      }
    }
    return false;
  };

  const setup = (p5, canvasParentRef) => {
    var cnv = p5.createCanvas(400, 400).parent(canvasParentRef);
    cnv.mouseClicked(mc);
    p5.frameRate(5);
    bgImg = p5.loadImage(require("./leaves.png"));
  };

  const displayStart = (p5) => {
    p5.fill(200, 10, 20);
    p5.rect(100, 150, 200, 100, 20);
    p5.fill(255);
    p5.textSize(30);
    p5.text("PLAY NOW!", 116, 210);
  };

  useEffect(() => {
    const keyDownHandler = (event) => {
      if (!gameStarted) {
        return;
      }
      if (
        (event.key === "ArrowLeft" || event.key === "a") &&
        snake.xvel !== 20
      ) {
        snake.xvel = -20;
        snake.yvel = 0;
      }
      if (
        (event.key === "ArrowRight" || event.key === "d") &&
        snake.xvel !== -20
      ) {
        snake.xvel = 20;
        snake.yvel = 0;
      }
      if ((event.key === "ArrowUp" || event.key === "w") && snake.yvel !== 20) {
        snake.xvel = 0;
        snake.yvel = -20;
      }
      if (
        (event.key === "ArrowDown" || event.key === "s") &&
        snake.yvel !== -20
      ) {
        snake.xvel = 0;
        snake.yvel = 20;
      }
    };
    document.addEventListener("keydown", keyDownHandler);
    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  });

  const leftBtnPressed = () => {
    if (!gameStarted) {
      return;
    }
    if (snake.xvel !== 20) {
      snake.xvel = -20;
      snake.yvel = 0;
    }
  };

  const rightBtnPressed = () => {
    if (!gameStarted) {
      return;
    }
    if (snake.xvel !== -20) {
      snake.xvel = 20;
      snake.yvel = 0;
    }
  };

  const upBtnPressed = () => {
    if (!gameStarted) {
      return;
    }
    if (snake.yvel !== 20) {
      snake.xvel = 0;
      snake.yvel = -20;
    }
  };

  const downBtnPressed = () => {
    if (!gameStarted) {
      return;
    }
    if (snake.yvel !== -20) {
      snake.xvel = 0;
      snake.yvel = 20;
    }
  };

  const mc = () => {
    gameStarted = true;
  };

  const draw = (p5) => {
    p5.background(bgImg);
    if (!gameStarted) {
      displayStart(p5);
      return;
    }

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

    p5.fill(200, 10, 20);
    p5.ellipse(food.x + 10, food.y + 10, 20, 20);

    p5.fill(255);
    p5.text("Score: " + snake.score, 10, 20);
    p5.textSize(25);
  };

  return (
    <React.Fragment>
      <Sketch setup={setup} draw={draw} />
      <AlternateControls
        mode={props.mode}
        changeMode={props.changeMode}
        onRight={rightBtnPressed}
        onLeft={leftBtnPressed}
        onUp={upBtnPressed}
        onDown={downBtnPressed}
      />
    </React.Fragment>
  );
};

export default SnakeCanvas;
