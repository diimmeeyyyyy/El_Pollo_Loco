class World {
  gameCharacter = new Character();
  enemies = [new Chicken(), new Chicken(), new Chicken()];
  clouds = [new Clouds()];
  backgroundObjects = [
    new BackgroundObject("img/5_background/layers/air.png", 0, 720, 480),
    new BackgroundObject("img/5_background/layers/3_third_layer/1.png", 0),
    new BackgroundObject("img/5_background/layers/3_third_layer/2.png", 360),
    new BackgroundObject("img/5_background/layers/2_second_layer/1.png", 0),
    new BackgroundObject("img/5_background/layers/2_second_layer/2.png", 360),
    new BackgroundObject("img/5_background/layers/1_first_layer/1.png", 0),
    new BackgroundObject("img/5_background/layers/1_first_layer/2.png", 360),
  ];
  canvas;
  ctx;
  keyboard;

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
    //background zuerst, weil zuerst erstellt wird
    this.addObjectsToGame(this.backgroundObjects);
    //gameCharacter
    this.addToGame(this.gameCharacter);
    //Chicken
    this.addObjectsToGame(this.enemies);
    //Clouds
    this.addObjectsToGame(this.clouds);

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
      this.ctx.save();
      this.ctx.translate(moveableObject.width, 0);
      this.ctx.scale(-1, 1);
      moveableObject.x = moveableObject.x * -1;
    }
    this.ctx.drawImage(
      moveableObject.img,
      moveableObject.x,
      moveableObject.y,
      moveableObject.width,
      moveableObject.height
    );
    if (moveableObject.otherDirection) {
      moveableObject.x = moveableObject.x * -1;
      this.ctx.restore();
    }
  }
}
