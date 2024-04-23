class ThrowableObject extends MoveableObject {
  IMAGES_SALSA_BOTTLE_SPLASH = [
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
  ];

  IMAGES_SALSA_BOTTLE_ROTATION = [
    "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  constructor(x, y) {
    super().loadImage(
      "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png"
    );
    this.loadImages(this.IMAGES_SALSA_BOTTLE_SPLASH);
    this.loadImages(this.IMAGES_SALSA_BOTTLE_ROTATION);
    this.x = x;
    this.y = y;
    this.height = 80;
    this.width = 60;
    this.applyGravity();
    this.throw();
  }

  rotationInterval;

  animateBottleRotation() {
    this.rotationInterval = setInterval(() => {
      this.playAnimation(this.IMAGES_SALSA_BOTTLE_ROTATION);
    }, 50);
  }

  throw() {
    this.speedY = 30;
    this.applyGravity();
    setInterval(() => {
      this.x += 10;
    }, 25);
    this.animateBottleRotation();
  }

  splash(bottleX, bottleY) {
    clearInterval(this.rotationInterval); // Stop the rotation animation
    this.x = bottleX; // Set the x-coordinate of the splash animation
    this.y = bottleY; // Set the y-coordinate of the splash animation
    this.playAnimation(this.IMAGES_SALSA_BOTTLE_SPLASH); // Start the splash animation
  }
}
