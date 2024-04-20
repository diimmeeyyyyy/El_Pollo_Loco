class ChickenSmall extends MoveableObject {
  height = 70;
  y = 370;
  jump_on_small_chicken_sound = new Audio("audio/killSmallChicken.mp3");

  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
  ];

  IMAGES_DEAD = ["img/3_enemies_chicken/chicken_small/2_dead/dead.png"];

  offset = {
    top: 0,
    bottom: 0,
    right: 20,
    left: 20,
  };

  constructor() {
    super().loadImage("img/3_enemies_chicken/chicken_small/1_walk/1_w.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);
    this.x = 400 + Math.random() * 1700;
    this.speed = 0.15 + Math.random() * 0.25;
    this.animate();
  }

  smallEnemyIsDead = false;
  smallChickenInterval1;
  smallChickenInterval2;
  smallChickenDirectionChangeInterval;
  smallChickenJumpInterval;

  animate() {
    this.smallChickenInterval1 = setInterval(() => {
      if (!this.smallEnemyIsDead) {
        this.move();
      }
    }, 1000 / 60);
    this.smallChickenInterval2 = setInterval(() => {
      if (!this.smallEnemyIsDead) {
        this.playAnimation(this.IMAGES_WALKING);
      }
    }, 200);
    this.smallChickenDirectionChangeInterval = setInterval(() => {
      this.otherDirectionEnemy = !this.otherDirectionEnemy;
    }, 5000);
    this.smallChickenJumpInterval = setInterval(() => {
      this.speedY = 20;
    }, 3000);
  }

  move() {
    if (this.otherDirectionEnemy === false) {
      this.moveLeft();
    } else {
      this.moveRight();
    }
    this.y -= this.speedY; //Um die Y-Position zu ändern
    if (this.smallChickenIsAboveGround()) {
      this.speedY -= 1;
    } else {
      //If chicken touches ground
      this.y = 370;
      this.speedY = 0;
    }
  }

  smallChickenIsAboveGround() {
    return this.y < 370;
  }
}
