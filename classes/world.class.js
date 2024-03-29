class World {
  gameCharacter = new Character();
  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;

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
          /* this.gameCharacter.playAnimation(this.gameCharacter.IMAGES_HURT); */
          console.log(
            "Collision with Character, energy",
            this.gameCharacter.energy
          );
        }
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
    //gameCharacter
    this.addToGame(this.gameCharacter);
    //Chicken
    this.addObjectsToGame(this.level.enemies);
    //Clouds
    this.addObjectsToGame(this.level.clouds);

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
