class World {
  gameCharacter = new Character();
  /* enemies = level1.enemies;
  clouds = level1.clouds;
  backgroundObjects = level1.backgroundObjects; */
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
    this.ctx.drawImage(
      moveableObject.img,
      moveableObject.x,
      moveableObject.y,
      moveableObject.width,
      moveableObject.height
    );
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
