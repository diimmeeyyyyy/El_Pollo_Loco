class Chicken extends MoveableObject {
  height = 100;
  y = 350;
  jump_on_chicken_sound = new Audio("audio/deadChicken.mp3");

  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];

  IMAGES_DEAD = ["img/3_enemies_chicken/chicken_normal/2_dead/dead.png"];

  offset = {
    top: 0,
    bottom: 0,
    right: 20,
    left: 20,
  };

  /**
   * Constructor for the Chicken class
   */
  constructor() {
    super().loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);
    this.x = 500 + Math.random() * 1500;
    this.speed = 0.9 + Math.random() * 0.4;
    this.animate();
  }

  enemyIsDead = false;
  chickenMovementInterval;
  chickenAnimationInterval;

  /**
   *  Animates the chicken in the game
   */
  animate() {
    this.chickenMovementInterval = setInterval(() => {
      if (this.enemyIsDead == false) {
        this.moveLeft();
      }
    }, 1000 / 30);
    this.chickenMovementInterval = setInterval(() => {
      if (this.enemyIsDead == false) {
        this.playAnimation(this.IMAGES_WALKING);
      }
    }, 150);
  }
}
