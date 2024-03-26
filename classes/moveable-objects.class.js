class MoveableObject {
  x = 120;
  y = 350;
  img;
  width = 100;
  height = 150;
  imageCache = {};
  currentImage = 0;
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  acceleration = 2; //gravity-acceleration

  applyGrafity() {
    setInterval(() => {
      if (this.isAboveGround()) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  isAboveGround() {
    return this.y < 230;
  }

  loadImage(path) {
    this.img = new Image(); //this.img = document.getElementById("image") <img id="image">
    this.img.src = path;
  }

  loadImages(array) {
    array.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  playAnimation(images) {
    let i = this.currentImage % images.length; //Modulo-Operator (%)
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  moveRight() {
    console.log("Hello world");
  }

  moveLeft() {
    setInterval(() => {
      this.x -= this.speed;
    }, 1000 / 60);
  }
}
