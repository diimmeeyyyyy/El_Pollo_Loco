class World {
  gameCharacter = new Character();
  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  statusBar_health = new StatusBar(30, 0, "health", 100);
  statusBar_coins = new StatusBar(30, 50, "coins", 0);
  statusBar_bottle = new StatusBar(30, 100, "bottle", 0);
  statusBar_endboss = new StatusBar(500, 0, "endboss", 100);
  throwableObjects = [];
  /* gameOverScreen = "img/9_intro_outro_screens/game_over/game over!.png"; */

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.run();
  }

  gameInterval;
  collisionInterval;
  run() {
    this.gameInterval = setInterval(() => {
      this.checkBottlesOnGround();
      this.checkCoins();
      this.CheckCharacterJump();
      this.checkCharacterLife();
    }, 1000 / 60);

    this.collisionInterval = setInterval(() => {
      this.checkCollisions();
      this.checkThrowableObjects();
      this.checkBottleCollision();
    }, 200);
  }

  checkCharacterLife() {
    if (this.gameCharacter.isAlive == false) {
      this.stopGame();
      this.showGameOverScreen();
      this.removeMobileArrows();
    }
  }

  checkBottleCollision() {
    this.throwableObjects.forEach((bottle) => {
      this.level.enemies.forEach((enemy) => {
        if (bottle.isColliding(enemy)) {
          if (enemy instanceof Endboss) {
            enemy.endbossIsCollidingBottle();
            this.statusBar_endboss.setPercentage(
              enemy.endbossEnergy,
              "endboss"
            );
          }
        }
      });
    });
  }

  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (
        this.gameCharacter.isColliding(enemy) &&
        !this.gameCharacter.isAboveGround() &&
        enemy.enemyIsdead === false
      ) {
        this.gameCharacter.hit();
        this.statusBar_health.setPercentage(
          this.gameCharacter.energy,
          "health"
        );
      }
    });
  }

  CheckCharacterJump() {
    this.level.enemies = this.level.enemies.filter((enemy) => {
      if (
        this.gameCharacter.isColliding(enemy) &&
        this.gameCharacter.isAboveGround() &&
        this.gameCharacter.speedY < 0 &&
        enemy.enemyIsdead === false
      ) {
        console.log("Character is jumping on enemy");
        if (enemy instanceof Chicken) {
          enemy.enemyIsdead = true;
          enemy.img.src = enemy.IMAGES_DEAD;
          enemy.jump_on_chicken_sound.play();
          if (enemy.enemyIsdead) {
            setTimeout(() => {
              enemy.img = null;
            }, 2000);
          }
        }
        /* return false; */
        //add animation of dead chicken
      }
      return true;
    });
  }

  checkBottlesOnGround() {
    this.level.salsaBottles = this.level.salsaBottles.filter((bottle) => {
      if (
        this.gameCharacter.isColliding(bottle) &&
        this.gameCharacter.bottlesAmount !== 100
      ) {
        this.gameCharacter.isCollecting("bottle");
        this.statusBar_bottle.setPercentage(
          this.gameCharacter.bottlesAmount,
          "bottle"
        );
        // if character collides with bottle, i remove it from array
        return false;
      }
      // if character doesnt collide with bottle, i keep it in the game
      return true;
    });
  }

  checkCoins() {
    this.level.coins = this.level.coins.filter((coin) => {
      if (
        this.gameCharacter.isColliding(coin) &&
        this.gameCharacter.coinAmount !== 100
      ) {
        this.gameCharacter.isCollecting("coin");
        this.statusBar_coins.setPercentage(
          this.gameCharacter.coinAmount,
          "coins"
        );
        return false;
      }
      return true;
    });
  }

  checkThrowableObjects() {
    if (this.keyboard.D && this.gameCharacter.bottlesAmount > 0) {
      this.gameCharacter.idleTimer = 0;
      let bottle = new ThrowableObject(
        this.gameCharacter.x + 100,
        this.gameCharacter.y
      );
      this.throwableObjects.push(bottle);
      this.gameCharacter.bottlesAmount -= 20;
      this.statusBar_bottle.setPercentage(
        this.gameCharacter.bottlesAmount,
        "bottle"
      );
    }
  }

  showGameOverScreen() {
     let canvas = document.getElementById("Canvas");
    let ctx = canvas.getContext("2d");

    let img = new Image();
    img.onload = function () {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      console.log("BILD WAS LOADED");
    };
    img.src = "img/9_intro_outro_screens/game_over/game over!.png";
    let gameOverScreen = document.querySelector(".game-over-screen");
    gameOverScreen.classList.remove("d-none");
  }

  stopGame() {
    clearInterval(this.gameInterval);
    clearInterval(this.collisionInterval);

    this.level.enemies.forEach((enemy) => {
      clearInterval(enemy.chickenInterval1);
      clearInterval(enemy.chickenInterval2);
      clearInterval(enemy.endbossInterval);
    });

    clearInterval(this.gameCharacter.characterInterval1);
    clearInterval(this.gameCharacter.characterInterval2);
  }

  removeMobileArrows() {
    let allButtons = document.querySelectorAll(".mobile-movement");
    allButtons.forEach((button) => {
      button.style.display = "none";
    });
  }

  setWorld() {
    this.gameCharacter.world = this;
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.camera_x, 0);

    //background zuerst, weil zuerst erstellt wird
    this.addObjectsToGame(this.level.backgroundObjects);
    //Clouds
    this.addObjectsToGame(this.level.clouds);
    //throwable objects
    this.addObjectsToGame(this.throwableObjects);
    //salsa bottles
    this.addObjectsToGame(this.level.salsaBottles);
    //coins
    this.addObjectsToGame(this.level.coins);

    //statusBar_health
    this.ctx.translate(-this.camera_x, 0); //back
    this.addToGame(this.statusBar_health);
    this.ctx.translate(this.camera_x, 0); //forward

    //statusBar_coins
    this.ctx.translate(-this.camera_x, 0); //back
    this.addToGame(this.statusBar_coins);
    this.ctx.translate(this.camera_x, 0); //forward

    //statusBar_bottle
    this.ctx.translate(-this.camera_x, 0); //back
    this.addToGame(this.statusBar_bottle);
    this.ctx.translate(this.camera_x, 0); //forward

    // statusBar_endboss
    if (this.gameCharacter.x >= 2000) {
      this.ctx.translate(-this.camera_x, 0); //back
      this.addToGame(this.statusBar_endboss);
      this.ctx.translate(this.camera_x, 0); //forward
    }

    //gameCharacter
    this.addToGame(this.gameCharacter);

    //Chicken
    this.addObjectsToGame(this.level.enemies);

    this.ctx.translate(-this.camera_x, 0);

    // draw() wird immer wieder aufgerufen
    self = this;
    requestAnimationFrame(function () {
      if (self.gameCharacter.isAlive) {
        self.draw();
      }
    });
  }

  addObjectsToGame(objects) {
    objects.forEach((object) => {
      this.addToGame(object);
    });
  }

  addToGame(moveableObject) {
    if (moveableObject.otherDirection) {
      this.flipImage(moveableObject);
    }
    moveableObject.draw(this.ctx);
    moveableObject.drawFrame(this.ctx);

    if (moveableObject.otherDirection) {
      this.flipImageBack(moveableObject);
    }
  }

  flipImage(moveableObject) {
    this.ctx.save();
    this.ctx.translate(moveableObject.width, 0); //verursacht Verchiebung
    this.ctx.scale(-1, 1); //verursacht Spiegelung
    moveableObject.x = moveableObject.x * -1; //X-Achse spiegeln
  }

  flipImageBack(moveableObject) {
    moveableObject.x = moveableObject.x * -1;
    this.ctx.restore();
  }
}
