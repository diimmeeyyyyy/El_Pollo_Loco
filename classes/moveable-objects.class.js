class MoveableObject extends DrawableObject {
  speed = 0.15;
  otherDirection = false;
  otherDirectionEnemy = false;
  speedY = 0;
  acceleration = 2; //gravity-acceleration
  lastHit = 0;
  collectBottle_sound = new Audio("audio/collectBottle.mp3");
  collectCoin_sound = new Audio("audio/collectCoin.mp3");
  endbossEnergy = 100;
  intervalIDs = [];

  offset = {
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
  };

  /* setStoppableInterval(fn, time) {
    let id = setInterval(fn, time);
    this.intervalIDs.push(id);
  } */

  isColliding(mo) {
    return (
      this.x + this.width - this.offset.right > mo.x + mo.offset.left && //CHECK RIGHT -> LEFT
      this.y + this.height - this.offset.bottom > mo.y + mo.offset.top && //CHECK TOP -> BOTTOM
      this.x + this.offset.left < mo.x + mo.width - mo.offset.right && //CHECK LEFT -> RIGHT
      this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom //CHECK BOTTOM -> TOP
    );
  }

  isCollecting(object) {
    if (object === "bottle") {
      if (this.bottlesAmount < 100) {
        this.bottlesAmount += 20;
        this.collectBottle_sound.play();
      } else {
        this.bottlesAmount = 100;
      }
      console.log(this.bottlesAmount);
    } else if (object === "coin") {
      if (this.coinAmount < 100) {
        this.coinAmount += 20;
        this.collectCoin_sound.play();
      } else {
        this.coinAmount = 100;
      }
      console.log(this.coinAmount);
    }
  }

  endbossIsCollidingBottle() {
    this.endbossEnergy -= 25;
    if (this.endbossEnergy < 0) {
      this.endbossEnergy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  damageValues = {
    NormalChicken: 5,
    Endboss: 35,
  };

  gotHitBy(enemy) {
    const damage = this.damageValues[enemy];
    if (damage !== undefined) {
      this.energy -= damage;
      if (this.energy < 0) {
        this.energy = 0;
      } else {
        this.lastHit = new Date().getTime();
      }
      this.x -= 50;
    }
  }

  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit; // difference in ms
    timepassed = timepassed / 1000; // differnce in seconds
    return timepassed < 1;
  }

  isDead(energy) {
    return energy == 0;
  }

  showGameOverScreen() {
    if (this.endbossEnergy === 0) {
    }
  }

  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 35);
  }

  isAboveGround() {
    if (this instanceof ThrowableObject) {
      //throwableobjects should always fall
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
