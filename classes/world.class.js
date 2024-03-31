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

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.checkCollisions();
  }

  checkCollisions() {
    setInterval(() => {
      this.level.enemies.forEach((enemy) => {
        if (this.gameCharacter.isColliding(enemy)) {
          this.gameCharacter.hit();
          this.statusBar_health.setPercentage(
            this.gameCharacter.energy,
            "health"
          );
        }
      });
      this.level.salsaBottles = this.level.salsaBottles.filter((bottle) => {
        if (this.gameCharacter.isColliding(bottle)) {
          this.gameCharacter.collect();
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
    }, 200);
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
    //salsa bottles
    this.addObjectsToGame(this.level.salsaBottles);

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

    //gameCharacter
    this.addToGame(this.gameCharacter);
    //Chicken
    this.addObjectsToGame(this.level.enemies);

    this.ctx.translate(-this.camera_x, 0);

    // draw() wird immer wieder aufgerufen
    self = this;
    requestAnimationFrame(function () {
      self.draw();
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
