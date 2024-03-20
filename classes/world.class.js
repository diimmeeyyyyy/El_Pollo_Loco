class World {
  gameCharacter = new Character();
  enemies = [new Chicken(), new Chicken(), new Chicken()];

  ctx;
  constructor(canvas) {
    this.ctx = canvas.getContext("2d");
    this.draw();
  }

  draw() {
    this.ctx.drawImage(
      this.gameCharacter.img,
      this.gameCharacter.x,
      this.gameCharacter.y,
      this.gameCharacter.width,
      this.gameCharacter.height,
    );
  }
}
