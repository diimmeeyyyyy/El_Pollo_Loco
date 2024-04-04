class SalsaBottles extends DrawableObject {
  IMAGE_SALSA_BOTTLE = "img/6_salsa_bottle/1_salsa_bottle_on_ground.png";
  y = 360;
  height = 80;
  width = 60;

  offset = {
    top: 15,
    bottom: 15,
    right: 15,
    left: 15,
  };

  constructor(x) {
    super();
    this.x = x;
    this.loadImage(this.IMAGE_SALSA_BOTTLE);
  }
}
