class Endboss extends MoveableObject {
  height = 400;
  width = 250;
  y = 70;
  isDeadAnimationPlayed = false;
  endboss_damage_sound = new Audio("audio/endboss-damage.mp3");
  endboss_eliminated_sound = new Audio("audio/endboss_eliminated.mp3");
  endbossIsAlive = true;

  IMAGES_WALKING = [
    "img/4_enemie_boss_chicken/1_walk/G1.png",
    "img/4_enemie_boss_chicken/1_walk/G2.png",
    "img/4_enemie_boss_chicken/1_walk/G3.png",
    "img/4_enemie_boss_chicken/1_walk/G4.png",
  ];

  IMAGES_HURT = [
    "img/4_enemie_boss_chicken/4_hurt/G21.png",
    "img/4_enemie_boss_chicken/4_hurt/G22.png",
    "img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];

  IMAGES_DEAD = [
    "img/4_enemie_boss_chicken/5_dead/G24.png",
    "img/4_enemie_boss_chicken/5_dead/G25.png",
    "img/4_enemie_boss_chicken/5_dead/G26.png",
  ];

  offset = {
    top: 80,
    bottom: 20,
    right: 30,
    left: 20,
  };

  constructor() {
    super().loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.x = 2900;
    this.animate();
  }

  endbossWakingAnimation;
  endbossDamageInterval;
  endbossWalkingMovement;

  animate() {
    this.checkEndbossDamage();
    this.checkEndbossWalking();
  }

  checkEndbossDamage() {
    this.endbossDamageInterval = setInterval(() => {
      if (this.isHurt()) {
        this.playIsHurtAnimation();
      } else if (this.isDead(this.endbossEnergy)) {
        this.playDeathAnimation();
      }
    }, 200);
  }

  checkEndbossWalking() {
    this.endbossWakingAnimation = setInterval(() => {
      if (!this.isHurt() && !this.isDead(this.endbossEnergy)) {
        this.playAnimation(this.IMAGES_WALKING);
      }
    }, 200);
    this.endbossWalkingMovement = setInterval(() => {
      this.moveLeft();
    }, 1000 / 80);
  }

  playIsHurtAnimation() {
    this.endboss_damage_sound.play();
    this.playAnimation(this.IMAGES_HURT);
  }

  playDeathAnimation() {
    if (!this.isDeadAnimationPlayed) {
      this.isDeadAnimationPlayed = true;
      this.playAnimation(this.IMAGES_DEAD);
      this.endboss_eliminated_sound.play();

      setTimeout(() => {
        this.endbossIsAlive = false;
      }, 1000);
    }
  }
}
