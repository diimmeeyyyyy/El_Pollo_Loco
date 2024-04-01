class MoveableObject extends DrawableObject {
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  acceleration = 2; //gravity-acceleration
  energy = 100;
  lastHit = 0;
  bottlesAmount = 0;
  collectBottle_sound = new Audio("audio/collectBottle.mp3");

  isColliding(mo) {
    return (
      this.x + this.width > mo.x &&
      this.y + this.height > mo.y &&
      this.x < mo.x &&
      this.y < mo.y + mo.height
    );
  }

  collect() {
    this.bottlesAmount += 20;
    this.collectBottle_sound.play();
    if (this.bottlesAmount > 100) {
      this.bottlesAmount = 100;
    }
    console.log(this.bottlesAmount);
  }

  hit() {
    this.energy -= 5;
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime(); // thats how i save time in number format
    }
  }

  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit; // difference in ms
    timepassed = timepassed / 1000; // differnce in seconds
    return timepassed < 1;
  }

  isDead() {
    return this.energy == 0;
  }

  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  isAboveGround() {
    if (this instanceof ThrowableObject) {//throwableobjects should always fall
      return true;
    } else {
      return this.y < 240; //bc ground is at 240px
    }
  }

  playAnimation(images) {
    let i = this.currentImage % images.length; //Modulo-Operator (%)
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  moveRight() {
    this.x += this.speed;
  }

  moveLeft() {
    this.x -= this.speed;
  }
}
