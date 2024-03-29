class StatusBar extends DrawableObject {
  IMAGES_STATUSBAR_HEALTH = [
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png",
  ];

  percentage = 100;

  constructor() {
    super(); //to initialise methods from superior object
    this.loadImages(this.IMAGES_STATUSBAR_HEALTH);
    this.x = 30;
    this.y = 0;
    this.width = 200;
    this.height = 60;
    this.setPercentage(100);
  }

  //setPercentge(number)
  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES_STATUSBAR_HEALTH[this.resolveImageIndex()]; //determine number between 0 and 5, bc we got 5 img
    this.img = this.imageCache[path];
  }

  resolveImageIndex() {
    if (this.percentage == 100) {
      return 5;
    } else if (this.percentage > 80) {
      return 4;
    } else if (this.percentage > 60) {
      return 3;
    } else if (this.percentage > 40) {
      return 2;
    } else if (this.percentage > 20) {
      return 1;
    } else {
      return 0;
    }
  }
}
