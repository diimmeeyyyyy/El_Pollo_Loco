class Chicken extends MoveableObject {
  constructor(height = 95, y = 350) {
    super().loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.y = y;
    this.height = height;
    this.x = 200 + Math.random() * 500;
  }
}
