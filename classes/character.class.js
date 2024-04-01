class Character extends MoveableObject {
  height = 200;
  y = 240;

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
  speed = 10;
  walking_sound = new Audio("audio/walking.mp3");
  damage_sound = new Audio("audio/damage.mp3");
  jump_sound = new Audio("audio/jump.mp3");
  deadAnimationPlayed = false;

  constructor() {
    super().loadImage("img/2_character_pepe/1_idle/idle/I-1.png");
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_LONG_IDLE);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.applyGrafity();
    this.animate();
  }

  animate() {
    let idleTimer = 0;
    setInterval(() => {
      this.walking_sound.pause();
      if (this.world.keyboard.RIGHT && this.x < this.world.level.levelEndX) {
        this.moveRight();
        this.otherDirection = false;
        this.playSound(this.walking_sound);
        idleTimer = 0;
      }
      if (this.world.keyboard.LEFT && this.x > 0) {
        this.moveLeft();
        this.otherDirection = true;
        this.playSound(this.walking_sound);
        idleTimer = 0;
      }

      if (this.world.keyboard.SPACE && !this.isAboveGround()) {
        this.jump();
        idleTimer = 0;
      }

      if (
        !this.world.keyboard.SPACE &&
        !this.world.keyboard.RIGHT &&
        !this.world.keyboard.LEFT
      ) {
        idleTimer += 1;
      }

      if (idleTimer >= 60 * 5) {
        // bc 60 frames per second * 5 seconds
        this.playAnimation(this.IMAGES_LONG_IDLE);
      } else if (idleTimer >= 60 * 2) {
        // bc 60 frames per second * 3 seconds
        this.playAnimation(this.IMAGES_IDLE);
      }

      this.world.camera_x = -this.x + 100;
    }, 1000 / 60);

    setInterval(() => {
      if (this.isDead()) {
        //dead animation
        this.playDeathAnimation();
      } else if (this.isAboveGround()) {
        //jump animation
        this.playAnimation(this.IMAGES_JUMPING);
      } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
        //Walk animation
        this.playAnimation(this.IMAGES_WALKING);
      } else if (this.isHurt()) {
        this.playAnimation(this.IMAGES_HURT);
        this.damage_sound.play();
      }
    }, 50);
  }

  playSound(sound) {
    if (!this.isAboveGround()) {
      sound.play();
    }
  }

  playDeathAnimation() {
    if (!this.deadAnimationPlayed) {
      // Todesanimation abspielen
      this.playAnimation(this.IMAGES_DEAD);
      this.deadAnimationPlayed = true;
    }
  }

  jump() {
    this.speedY = 30;
    this.jump_sound.play();
  }
}
