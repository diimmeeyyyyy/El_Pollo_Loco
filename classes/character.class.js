class Character extends MoveableObject {
  IMAGES_IDLE = [
    "img/2_character_pepe/1_idle/idle/I-1.png",
    "img/2_character_pepe/1_idle/idle/I-2.png",
    "img/2_character_pepe/1_idle/idle/I-3.png",
    "img/2_character_pepe/1_idle/idle/I-4.png",
    "img/2_character_pepe/1_idle/idle/I-5.png",
    "img/2_character_pepe/1_idle/idle/I-6.png",
    "img/2_character_pepe/1_idle/idle/I-7.png",
    "img/2_character_pepe/1_idle/idle/I-8.png",
    "img/2_character_pepe/1_idle/idle/I-9.png",
    "img/2_character_pepe/1_idle/idle/I-10.png",
  ];

  IMAGES_LONG_IDLE = [
    "img/2_character_pepe/1_idle/long_idle/I-11.png",
    "img/2_character_pepe/1_idle/long_idle/I-12.png",
    "img/2_character_pepe/1_idle/long_idle/I-13.png",
    "img/2_character_pepe/1_idle/long_idle/I-14.png",
    "img/2_character_pepe/1_idle/long_idle/I-15.png",
    "img/2_character_pepe/1_idle/long_idle/I-16.png",
    "img/2_character_pepe/1_idle/long_idle/I-17.png",
    "img/2_character_pepe/1_idle/long_idle/I-18.png",
    "img/2_character_pepe/1_idle/long_idle/I-19.png",
    "img/2_character_pepe/1_idle/long_idle/I-20.png",
  ];

  IMAGES_WALKING = [
    "img/2_character_pepe/2_walk/W-21.png",
    "img/2_character_pepe/2_walk/W-22.png",
    "img/2_character_pepe/2_walk/W-23.png",
    "img/2_character_pepe/2_walk/W-24.png",
    "img/2_character_pepe/2_walk/W-25.png",
    "img/2_character_pepe/2_walk/W-26.png",
  ];

  IMAGES_JUMPING = [
    "img/2_character_pepe/3_jump/J-31.png",
    "img/2_character_pepe/3_jump/J-32.png",
    "img/2_character_pepe/3_jump/J-33.png",
    "img/2_character_pepe/3_jump/J-34.png",
    "img/2_character_pepe/3_jump/J-35.png",
    "img/2_character_pepe/3_jump/J-36.png",
    "img/2_character_pepe/3_jump/J-37.png",
    "img/2_character_pepe/3_jump/J-38.png",
    "img/2_character_pepe/3_jump/J-39.png",
  ];

  IMAGES_HURT = [
    "img/2_character_pepe/4_hurt/H-41.png",
    "img/2_character_pepe/4_hurt/H-42.png",
    "img/2_character_pepe/4_hurt/H-43.png",
  ];
  IMAGES_DEAD = [
    "img/2_character_pepe/5_dead/D-51.png",
    "img/2_character_pepe/5_dead/D-52.png",
    "img/2_character_pepe/5_dead/D-53.png",
    "img/2_character_pepe/5_dead/D-54.png",
    "img/2_character_pepe/5_dead/D-55.png",
    "img/2_character_pepe/5_dead/D-56.png",
    "img/2_character_pepe/5_dead/D-57.png",
  ];

  IMAGE_GAMEOVER = "img/9_intro_outro_screens/game_over/game over!.png";
  world;

  offset = {
    top: 120,
    bottom: 10,
    right: 30,
    left: 20,
  };

  constructor() {
    super().loadImage("img/2_character_pepe/1_idle/idle/I-1.png");
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_LONG_IDLE);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.applyGravity();
    this.animate();
    this.checkBottleThrow();
    this.height = 200;
    this.y = 240;
    /* this.deadAnimationPlayed = false; */
    this.isAlive = true;
    this.bottlesAmount = 0;
    this.speed = 10;
    this.coinAmount = 0;
    this.energy = 100;
    this.walking_sound = new Audio("audio/walking.mp3");
    this.damage_sound = new Audio("audio/damage.mp3");
    this.jump_sound = new Audio("audio/jump.mp3");
    this.noBottlesToThrow_sound = new Audio("audio/noBottlesToThrow.mp3");
    this.throwBottle_sound = new Audio("audio/throwBottle.mp3");
    this.snoring_sound = new Audio("audio/snoring.m4a");
    this.idleTimer = 0;
    this.characterMovementInterval;
    this.characterAnimationInterval;
  }

  reset() {
    this.bottlesAmount = 0;
    this.coinAmount = 0;
    this.energy = 100;
    this.deadAnimationPlayed = false;
    this.isAlive = true;
  }

  animate() {
    this.checkCharacterMovement();
    this.checkCharacterAnimation();
  }

  checkCharacterMovement() {
    this.characterMovementInterval = setInterval(() => {
      this.walking_sound.pause();
      if (this.canMoveRight()) this.moveRight();
      if (this.canMoveLeft()) this.moveLeft();
      if (this.canJump()) this.jump();
      if (this.canThrowBottle()) this.idleTimer += 1;
      if (this.noKeyPressed()) this.idleTimer += 1;
      this.checkIdleStatus();
      this.world.camera_x = -this.x + 100;
    }, 1000 / 60);
  }

  canMoveRight() {
    return this.world.keyboard.RIGHT && this.x < this.world.level.levelEndX;
  }

  moveRight() {
    this.stopLongIdle();
    super.moveRight();
    this.otherDirection = false;
    this.playSound(this.walking_sound);
  }

  canMoveLeft() {
    return this.world.keyboard.LEFT && this.x > 0;
  }

  moveLeft() {
    this.stopLongIdle();
    super.moveLeft();
    this.otherDirection = true;
    this.playSound(this.walking_sound);
  }

  canJump() {
    return this.world.keyboard.SPACE && !this.isAboveGround();
  }

  jump() {
    this.stopLongIdle();
    this.speedY = 30;
    this.jump_sound.play();
  }

  canThrowBottle() {
    return this.world.keyboard.D;
  }

  checkBottleThrow() {
    if (this.bottleThrowHandler) {
      document.removeEventListener("keydown", this.bottleThrowHandler);
    }

    // Definieren des neuen Event-Listeners
    this.bottleThrowHandler = (event) => {
      if (event.key === "d" || event.key === "D") {
        this.throwBottle();
      }
    };

    document.addEventListener("keydown", this.bottleThrowHandler);
  }

  throwBottle() {
    this.stopLongIdle();
    if (this.bottlesAmount <= 0) {
      this.playAnimation(this.IMAGES_IDLE);
      this.playSound(this.noBottlesToThrow_sound);
    } else {
      let bottle = new ThrowableObject(this.x + 100, this.y);
      this.world.throwableObjects.push(bottle);
      this.bottlesAmount -= 20;
      this.playSound(this.throwBottle_sound);
      this.world.statusBar_bottle.setPercentage(this.bottlesAmount, "bottle");
    }
  }

  noKeyPressed() {
    return (
      !this.world.keyboard.SPACE &&
      !this.world.keyboard.RIGHT &&
      !this.world.keyboard.LEFT &&
      !this.world.keyboard.D
    );
  }

  keyPressed() {
    return (
      this.world.keyboard.SPACE &&
      this.world.keyboard.RIGHT &&
      this.world.keyboard.LEFT &&
      this.world.keyboard.D
    );
  }

  checkCharacterAnimation() {
    this.characterAnimationInterval = setInterval(() => {
      if (this.isDead(this.energy)) {
        this.playDeathAnimation();
      } else if (this.isAboveGround()) {
        this.playAnimation(this.IMAGES_JUMPING);
      } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
        this.playAnimation(this.IMAGES_WALKING);
      } else if (this.isHurt()) {
        this.playHurtAnimation();
      }
    }, 100);
  }

  playHurtAnimation() {
    this.stopLongIdle();
    this.stopSnoringSound();
    this.playAnimation(this.IMAGES_HURT);
    this.playSound(this.damage_sound);
  }

  playSound(sound) {
    if (!this.isAboveGround() && sound.paused) {
      sound.play();
    }
  }

  idleInterval;
  longIdleInterval;

  checkIdleStatus() {
    if (this.keyPressed()) {
      this.stopLongIdle();
    }
    this.checkIdleAnimation();
  }

  checkIdleAnimation() {
    if (!this.isDead()) {
      if (this.idleTimer >= 60 * 5) {
        // bc 60 frames per second * 5 seconds
        this.stopIdleAnimation();
        this.playLongIdleAnimation();
      } else if (this.idleTimer >= 60 * 0.5) {
        // bc 60 frames per second * 0.5 seconds
        this.playIdleAnimation();
      }
    }
  }

  playIdleAnimation() {
    if (!this.idleInterval) {
      this.idleInterval = setInterval(() => {
        this.playAnimation(this.IMAGES_IDLE);
      }, 300);
    }
  }

  stopIdleAnimation() {
    if (this.idleInterval) {
      clearInterval(this.idleInterval);
      this.idleInterval = null;
    }
  }

  playLongIdleAnimation() {
    if (!this.longIdleInterval) {
      this.longIdleInterval = setInterval(() => {
        this.playAnimation(this.IMAGES_LONG_IDLE);
      }, 100); // adjust this value to change the speed of the animation
    }
    this.snoring_sound.play();
  }

  stopLongIdle() {
    if (this.longIdleInterval) {
      clearInterval(this.longIdleInterval);
      this.longIdleInterval = null;
    }
    this.stopSnoringSound();
    this.idleTimer = 0;
  }

  playDeathAnimation() {
    this.playAnimation(this.IMAGES_DEAD);
    this.world.gameOver = true;
    this.world.checkSound();
    setTimeout(() => {
      this.isAlive = false;
    }, 700);
  }

  stopSnoringSound() {
    this.snoring_sound.pause();
    this.snoring_sound.currentTime = 0;
  }
}
