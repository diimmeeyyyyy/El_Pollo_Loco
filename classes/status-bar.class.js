class StatusBar extends DrawableObject {
  IMAGES_STATUSBAR_HEALTH = [
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png",
  ];

  IMAGES_STATUSBAR_COIN = [
    "img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png",
  ];

  IMAGES_STATUSBAR_BOTTLE = [
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/0.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/20.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/40.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/60.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/80.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/100.png",
  ];

  IMAGES_STATUSBAR_ENDBOSS = [
    "img/7_statusbars/2_statusbar_endboss/green/green0.png",
    "img/7_statusbars/2_statusbar_endboss/green/green20.png",
    "img/7_statusbars/2_statusbar_endboss/green/green40.png",
    "img/7_statusbars/2_statusbar_endboss/green/green60.png",
    "img/7_statusbars/2_statusbar_endboss/green/green80.png",
    "img/7_statusbars/2_statusbar_endboss/green/green100.png",
  ];

  constructor(x, y, type, beginningPercentage) {
    super(); //to initialise methods from superior object
    this.loadImages(this.IMAGES_STATUSBAR_HEALTH);
    this.loadImages(this.IMAGES_STATUSBAR_COIN);
    this.loadImages(this.IMAGES_STATUSBAR_BOTTLE);
    this.loadImages(this.IMAGES_STATUSBAR_ENDBOSS);
    this.x = x;
    this.y = y;
    this.width = 200;
    this.height = 60;
    this.setPercentage(beginningPercentage, type);
  }

  //setPercentge(number)
  setPercentage(percentage, type) {
    this.percentage = percentage;
    let path;
    if (type === "health") {
      path = this.IMAGES_STATUSBAR_HEALTH[this.resolveImageIndex()]; //determine number between 0 and 5, bc we got 5 img
    } else if (type === "coins") {
      path = this.IMAGES_STATUSBAR_COIN[this.resolveImageIndex()]; //determine number between 0 and 5, bc we got 5 img
    } else if (type === "bottle") {
      path = this.IMAGES_STATUSBAR_BOTTLE[this.resolveImageIndex()]; //determine number between 0 and 5, bc we got 5 img
    } else if (type === "endboss") {
      path = this.IMAGES_STATUSBAR_ENDBOSS[this.resolveImageIndex()];
    }
    this.img = this.imageCache[path];
  }

  resolveImageIndex() {
    if (this.percentage == 100) {
      return 5;
    } else if (this.percentage >= 80) {
      return 4;
    } else if (this.percentage >= 60) {
      return 3;
    } else if (this.percentage >= 40) {
      return 2;
    } else if (this.percentage >= 20) {
      return 1;
    } else {
      return 0;
    }
  }
}
