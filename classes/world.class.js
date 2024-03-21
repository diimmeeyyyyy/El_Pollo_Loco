class World {
  gameCharacter = new Character();
  enemies = [new Chicken(), new Chicken(), new Chicken()];
  clouds = [new Clouds()];
  backgroundObjects = [
    new BackgroundObject("img/5_background/layers/1_first_layer/1.png"),
  ];
  canvas;
  ctx;

  constructor(canvas) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.draw();
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    //gameCharacter
    this.addToMap(this.gameCharacter);

    //Chicken
    this.enemies.forEach((enemy) => {
      this.addToMap(enemy);
    });

    //Clouds
    this.clouds.forEach((cloud) => {
      this.addToMap(cloud);
    });

    // draw() wird immer wieder aufgerufen
    self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  addToMap(moveableObject) {
    this.ctx.drawImage(
      moveableObject.img,
      moveableObject.x,
      moveableObject.y,
      moveableObject.width,
      moveableObject.height
    );
  }
}
