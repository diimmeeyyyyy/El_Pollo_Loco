class Chicken extends MoveableObject {
  height = 95;
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
    right: 0,
    left: 0,
  };

  constructor() {
    super().loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);
    this.x = 200 + Math.random() * 1800;
    this.speed = 0.15 + Math.random() * 0.25;
    this.animate();
  }
  enemyIsdead = false;

  animate() {
    setInterval(() => {
      if (this.enemyIsdead == false) {
        this.moveLeft();
      }
    }, 1000 / 60);
    setInterval(() => {
      if (this.enemyIsdead == false) {
        this.playAnimation(this.IMAGES_WALKING);
      }
    }, 500);
  }
}
