window.onload = () => {
  document.getElementById("start-button").onclick = () => {
    startGame();
  };

  // get canvas and create ctx
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  let interval;
  // let gameInterval;

  // define car class
  class Car {
    constructor(width, height, x, y) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;

      // this.carImg = new Image();
      // this.carImg.src = "./images/car.png";
    }

    // draw() {
    //   ctx.drawImage(this.carImg, this.x, this.y, this.width, this.height);
    // }

    moveRight() {
      this.x += 20;
    }

    moveLeft() {
      this.x -= 20;
    }
  }

  // create background element
  const background = new Image();
  background.src = "./images/road.png";

  let carImg = new Image();
  carImg.src = "./images/car.png";

  // create car instance
  let car = new Car(canvas.width / 10, canvas.height / 8, 220, 580);

  function startGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    // car.draw();
    ctx.drawImage(carImg, car.x, car.y, car.width, car.height);

    //create objects
    interval = setInterval(() => {
      update();
    }, 20);
  }

  // updates and renders new values
  function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(carImg, car.x, car.y, car.width, car.height);
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
