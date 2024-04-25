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

  /**
   * Constructor for the ThrowableObject class
   * @param {number} x - The x-coordinate of the throwable object
   * @param {number} y  - The y-coordinate of the throwable object
   */
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
    this.hasCollided = false;
    this.applyGravity();
    this.throw();
  }

  rotationInterval;

  /**
   *  Animates the rotation of the throwable object (salsa bottle)
   */
  animateBottleRotation() {
    this.rotationInterval = setInterval(() => {
      this.playAnimation(this.IMAGES_SALSA_BOTTLE_ROTATION);
    }, 50);
  }

  /**
   * Throws the throwable object (salsa bottle)
   */
  throw() {
    this.speedY = 30;
    this.applyGravity();
    setInterval(() => {
      this.x += 10;
    }, 25);
    this.animateBottleRotation();
  }

  /**
   * Triggers the splash animation for the throwable object (salsa bottle) at the given coordinates
   * @param {number} bottleX - The x-coordinate where the splash should occur
   * @param {number} bottleY - The y-coordinate where the splash should occur
   */
  splash(bottleX, bottleY) {
    this.x = bottleX;
    this.y = bottleY;
    /*  this.speedX = 0; // Stop horizontal movement */
    this.speedY = 0;
    clearInterval(this.rotationInterval); // Stop the rotation animation

    this.playAnimation(this.IMAGES_SALSA_BOTTLE_SPLASH); // Start the splash animation
  }
}
