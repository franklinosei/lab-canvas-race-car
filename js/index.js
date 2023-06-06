window.onload = () => {
  document.getElementById("start-button").onclick = () => {
    startGame();
  };

  // get canvas and create ctx
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  let interval;
  let gameInterval;

  let score = 0;

  // car obstacles
  let carObstacles = [];

  // define car class
  class Car {
    constructor(width, height, x, y, ctx) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.ctx = ctx;

      this.carImg = new Image();
      this.carImg.src = "./images/car.png";
    }

    draw() {
      this.ctx.drawImage(this.carImg, this.x, this.y, this.width, this.height);
    }

    moveRight() {
      const maxX = canvas.width - this.width - 40;
      if (this.x < maxX) {
        this.x += 10;
      }
    }

    moveLeft() {
      const minX = 40;
      if (this.x > minX) {
        this.x -= 10;
      }
    }
  }

  // Obstacle class
  class Obstacle {
    constructor(x, ctx) {
      this.x = x;
      this.y = -10;
      this.width = 130;
      this.height = 30;
      this.color = "#870007";
      this.ctx = ctx;
      
    }

    draw() {
      this.ctx.fillStyle = this.color;
      this.ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    moveVertically() {
      this.y += 5;
    }

  }

  function createObstacle() {
    let x = Math.floor(Math.random() * canvas.width);
    carObstacles.push(new Obstacle(x, ctx));
  }

  // create background element
  const background = new Image();
  background.src = "./images/road.png";

  let carImg = new Image();
  carImg.src = "./images/car.png";

  // create car instance
  let car = new Car(
    canvas.width / 10,
    canvas.height / 8,
    canvas.width / 2,
    canvas.height - 100,
    ctx
  );

  // callback to start game
  function startGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    car.draw();

    //create objects
    interval = setInterval(() => {
      createObstacle();
      update();
    }, 2000);

    gameInterval = setInterval(update, 1000 / 60);
  }

  // updates and renders new values
  function update() {
    // increase the score when the function is called
    score++;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    car.draw();
    // ctx.font = "19px Arial";
    // ctx.fillText(`Score: ${score}`, 10, 50);

   
    carObstacles.forEach((obstacle) => {
      obstacle.draw();
      obstacle.moveVertically();
    });



    carObstacles = carObstacles.filter((obstacle) => obstacle.y < canvas.height);
  }

  // add key events and move car
  document.addEventListener("keydown", (event) => {
    switch (event.key) {
      case "ArrowRight":
        car.moveRight();
        break;

      case "ArrowLeft":
        car.moveLeft();
        break;
    }
  });
};
