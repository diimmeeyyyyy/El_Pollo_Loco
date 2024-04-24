class Endboss extends MoveableObject {
  height = 400;
  width = 250;
  y = 70;
  isDeadAnimationPlayed = false;
  endboss_damage_sound = new Audio("audio/endboss-damage.mp3");
  endboss_eliminated_sound = new Audio("audio/endboss_eliminated.mp3");
  endboss_alert_sound = new Audio("audio/chicken-alert.mp3");
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

  IMAGES_ALERT = [
    "img/4_enemie_boss_chicken/2_alert/G5.png",
    "img/4_enemie_boss_chicken/2_alert/G6.png",
    "img/4_enemie_boss_chicken/2_alert/G7.png",
    "img/4_enemie_boss_chicken/2_alert/G8.png",
    "img/4_enemie_boss_chicken/2_alert/G9.png",
    "img/4_enemie_boss_chicken/2_alert/G10.png",
    "img/4_enemie_boss_chicken/2_alert/G11.png",
    "img/4_enemie_boss_chicken/2_alert/G12.png",
  ];

  IMAGES_ATTACK = [
    "img/4_enemie_boss_chicken/3_attack/G13.png",
    "img/4_enemie_boss_chicken/3_attack/G14.png",
    "img/4_enemie_boss_chicken/3_attack/G15.png",
    "img/4_enemie_boss_chicken/3_attack/G16.png",
    "img/4_enemie_boss_chicken/3_attack/G17.png",
    "img/4_enemie_boss_chicken/3_attack/G18.png",
    "img/4_enemie_boss_chicken/3_attack/G19.png",
    "img/4_enemie_boss_chicken/3_attack/G20.png",
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
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_ATTACK);
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

  /**
   * Checks the damage status of the end boss at regular intervals
   */
  checkEndbossDamage() {
    this.endbossDamageInterval = setInterval(() => {
      if (this.isHurt()) {
        this.clearEndbossWalkingInterval();
        this.playEndbossIsHurtAnimation();
        //WALKING ANIMATION WIEDER LAUFEN LASSEN
      } else if (this.isDead(this.endbossEnergy)) {
        this.clearEndbossWalkingInterval();
        this.playEndbossDeathAnimation();
      }
    }, 200);
  }

  /**
   * Checks the walking status of the end boss at regular intervals
   */
  checkEndbossWalking() {
    this.endbossWakingAnimation = setInterval(() => {
      if (!this.isHurt() && !this.isDead(this.endbossEnergy)) {
        this.playAnimation(this.IMAGES_WALKING);
      }
    }, 75);
    this.endbossWalkingMovement = setInterval(() => {
      if (!this.isHurt() || !this.isDead(this.endbossEnergy)) {
        this.moveLeft();
      }
    }, 1000 / 800);
  }

  clearEndbossWalkingInterval() {
    if (this.endbossWakingAnimation) {
      clearInterval(this.endbossWakingAnimation);
    }
    if (this.endbossWalkingMovement) {
      clearInterval(this.endbossWalkingMovement);
    }
  }

  /*   playEndbossAlertAnimation() {
    // Play the alert animation
    this.playAnimation(this.IMAGES_ALERT);
  }

  playEndbossAttackAnimation() {
    this.playAnimation(this.IMAGES_ATTACK);
  } */

  /**
   * Plays the hurt animation and sound for the endboss
   */
  playEndbossIsHurtAnimation() {
    this.endboss_damage_sound.play();
    this.playAnimation(this.IMAGES_HURT);
  }

  /**
   * Plays the death animation and sound for the endboss
   */
  playEndbossDeathAnimation() {
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
