class Coins extends DrawableObject {
  IMAGE_COIN = "img/8_coin/coin_1.png";
  height = 200;
  width = 200;

  offset = {
    top: 70,
    bottom: 70,
    right: 70,
    left: 70,
  };

  /**
   * Constructor for the Coins class
   */
  constructor() {
    super();
    this.x = 400 + Math.random() * 1800;
    this.y = 80 + Math.random() * 120;
    this.loadImage(this.IMAGE_COIN);
  }
}
