class ThrowableObject extends MoveableObject {
  constructor(x, y) {
    super().loadImage(
      "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png"
    );
    this.x = x;
    this.y = y;
    this.height = 80;
    this.width = 60;
    this.throw();
  }

  throw() {
    this.speedY = 30;
    this.applyGrafity();
    setInterval(() => {
      this.x += 10;
    }, 25);
  }
}
