class MoveableObject extends DrawableObject {
  speed;
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

  /**
   * Checks if the current object is colliding with another moveable object
   * @param {MoveableObject} mo - The other moveable object to check for collision
   * @returns {boolean} - Returns true if the current object is colliding with the other moveable object, false otherwise
   */
  isColliding(mo) {
    return (
      this.x + this.width - this.offset.right > mo.x + mo.offset.left && //CHECK RIGHT -> LEFT
      this.y + this.height - this.offset.bottom > mo.y + mo.offset.top && //CHECK TOP -> BOTTOM
      this.x + this.offset.left < mo.x + mo.width - mo.offset.right && //CHECK LEFT -> RIGHT
      this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom //CHECK BOTTOM -> TOP
    );
  }

  /**
   * Handles the collection of objects by the character
   * @param {string} object - The type of object being collected
   */
  isCollecting(object) {
    if (object === "bottle") {
      if (this.bottlesAmount < 100) {
        this.bottlesAmount += 20;
        this.collectBottle_sound.play();
      } else {
        this.bottlesAmount = 100;
      }
    } else if (object === "coin") {
      if (this.coinAmount < 100) {
        this.coinAmount += 20;
        this.collectCoin_sound.play();
      } else {
        this.coinAmount = 100;
      }
    }
  }

  /**
   * Handles the collision between the endboss and a bottle
   */
  endbossIsCollidingBottle() {
    this.endbossEnergy -= 25;
    if (this.endbossEnergy < 0) {
      this.endbossEnergy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  damageValues = {
    NormalChicken: 20,
    Endboss: 40,
  };

  /**
   * Handles loss of energy when character is colliding enemy
   * @param {string} enemy - The enemy that the character is colliding with
   */
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

  /**
   * Checks if the current object is hurt
   * @returns {boolean} - Returns true if the current object was hit within the last second, false otherwise
   */
  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit; // difference in ms
    timepassed = timepassed / 1000; // differnce in seconds
    return timepassed < 1;
  }

  /**
   * Checks if the current object is dead
   * @param {number} energy - The current energy level of the object
   * @returns {boolean} - Returns true if the energy level is 0, indicating that the object is dead, false otherwise
   */
  isDead(energy) {
    return energy == 0;
  }

  /**
   * Applies gravity to the current object
   * It sets an interval that runs every 1000/35 milliseconds (approximately 28.57 times per second)
   * If the current object is above the ground or its vertical speed is greater than 0, it decreases the object's y-coordinate by its vertical speed and decreases the vertical speed by the acceleration due to gravity
   * This simulates the effect of gravity pulling the object downwards
   */
  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 35);
  }

  /**
   * Checks if the current object is above the ground
   * @returns {boolean} - Returns true if the current object is above the ground, false otherwise
   */
  isAboveGround() {
    if (this instanceof ThrowableObject) {
      //throwableobjects should always fall
      return true;
    } else {
      return this.y < 240; //bc ground is at 240px
    }
  }

  /**
   *  Plays the animation for the current object
   * @param {Array} images - The array of images that make up the animation
   */
  playAnimation(images) {
    let i = this.currentImage % images.length; //Modulo-Operator (%)
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  /**
   *  Moves the object to the right
   */
  moveRight() {
    this.x += this.speed;
  }

  /**
   * Moves the object to the left
   */
  moveLeft() {
    this.x -= this.speed;
  }
}
