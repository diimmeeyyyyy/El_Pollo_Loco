class World {
  gameCharacter = new Character();
  level = level1;
  collision = new Collision();
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  statusBar_health = new StatusBar(30, 0, "health", 100);
  statusBar_coins = new StatusBar(30, 50, "coins", 0);
  statusBar_bottle = new StatusBar(30, 100, "bottle", 0);
  statusBar_endboss = new StatusBar(500, 0, "endboss", 100);
  throwableObjects = [];

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.checkConstantly();
  }

  gameInterval;
  collisionInterval;
  checkConstantly() {
    this.gameInterval = setInterval(() => {
      this.collision.checkGameInterval();
    }, 1000 / 60);
    this.collisionInterval = setInterval(() => {
      this.collision.checkCollisionInterval();
    }, 200);
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
    this.collision.world = this;
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
