class World {
  gameCharacter = new Character();
  level = level1;
  collision = new Collision();
  endscreen = new Endscreen();
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  statusBar_health = new StatusBar(30, 0, "health", 100);
  statusBar_coins = new StatusBar(30, 50, "coins", 0);
  statusBar_bottle = new StatusBar(30, 100, "bottle", 0);
  statusBar_endboss = new StatusBar(500, 0, "endboss", 100);
  throwableObjects = [];
  gameOver = false;
  gameOver_sound = new Audio("audio/lost.mp3");
  gameWin = false;
  gameWin_sound = new Audio("audio/winMusic.mp3");

  allAudios = [
    this.gameCharacter.walking_sound,
    this.gameCharacter.damage_sound,
    this.gameCharacter.jump_sound,
    this.gameCharacter.noBottlesToThrow_sound,
    this.gameCharacter.throwBottle_sound,
    this.gameCharacter.collectCoin_sound,
    this.gameCharacter.collectBottle_sound,
    this.gameCharacter.snoring_sound,
    this.level.enemies[0].jump_on_chicken_sound,
    this.level.enemies[1].jump_on_chicken_sound,
    this.level.enemies[2].jump_on_chicken_sound,
    this.level.enemies[3].jump_on_chicken_sound,
    this.level.enemies[4].jump_on_small_chicken_sound,
    this.level.enemies[5].jump_on_small_chicken_sound,
    this.level.enemies[6].jump_on_small_chicken_sound,
    this.level.enemies[7].endboss_damage_sound,
    this.level.enemies[7].endboss_eliminated_sound,
    this.gameOver_sound,
    this.gameWin_sound,
  ];

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.checkSound();
    this.checkConstantly();
  }

  checkSound() {
    if (!soundIsOn) {
      this.allAudios.forEach((audio) => {
        audio.volume = 0;
        backgroundMusic.pause();
      });
    } else {
      this.allAudios.forEach((audio) => (audio.volume = 1));
      backgroundMusic.play();
    }
    if (this.gameOver) {
      this.gameOver_sound.play();
    }
    if (this.gameWin) {
      backgroundMusic.pause();
      this.gameWin_sound.play();
    }
  }

  gameInterval;
  collisionInterval;
  collisionIntervalChicken;
  checkConstantly() {
    this.gameInterval = setInterval(() => {
      this.collision.checkGameInterval();
    }, 1000 / 60);
    this.collisionInterval = setInterval(() => {
      this.collision.checkCollisionInterval();
    }, 300);
    this.collisionIntervalChicken = setInterval(() => {
      this.collision.checkBottleCollisionChicken();
    }, 100);
  }

  setWorld() {
    this.gameCharacter.world = this;
    this.collision.world = this;
    this.endscreen.world = this;
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.camera_x, 0);

    //background zuerst, weil zuerst erstellt wird
    this.addObjectsToGame(this.level.backgroundObjects);
    //Clouds
    this.addObjectsToGame(this.level.clouds);
    //throwable objects
    this.addObjectsToGame(this.throwableObjects);
    //salsa bottles
    this.addObjectsToGame(this.level.salsaBottles);
    //coins
    this.addObjectsToGame(this.level.coins);

    //statusBar_health
    this.ctx.translate(-this.camera_x, 0); //back
    this.addToGame(this.statusBar_health);
    this.ctx.translate(this.camera_x, 0); //forward

    //statusBar_coins
    this.ctx.translate(-this.camera_x, 0); //back
    this.addToGame(this.statusBar_coins);
    this.ctx.translate(this.camera_x, 0); //forward

    //statusBar_bottle
    this.ctx.translate(-this.camera_x, 0); //back
    this.addToGame(this.statusBar_bottle);
    this.ctx.translate(this.camera_x, 0); //forward

    // statusBar_endboss
    if (this.gameCharacter.x >= 2000) {
      this.ctx.translate(-this.camera_x, 0); //back
      this.addToGame(this.statusBar_endboss);
      this.ctx.translate(this.camera_x, 0); //forward
    }

    //gameCharacter
    this.addToGame(this.gameCharacter);

    //Chicken
    this.addObjectsToGame(this.level.enemies);

    this.ctx.translate(-this.camera_x, 0);

    // draw() wird immer wieder aufgerufen
    self = this;
    requestAnimationFrame(function () {
      if (self.gameCharacter.isAlive) {
        self.draw();
      }
    });
  }

  addObjectsToGame(objects) {
    objects.forEach((object) => {
      this.addToGame(object);
    });
  }

  addToGame(moveableObject) {
    if (moveableObject.otherDirection || moveableObject.otherDirectionEnemy) {
      this.flipImage(moveableObject);
    }
    moveableObject.draw(this.ctx);
    moveableObject.drawFrame(this.ctx);

    if (moveableObject.otherDirection || moveableObject.otherDirectionEnemy) {
      this.flipImageBack(moveableObject);
    }
  }

  flipImage(moveableObject) {
    this.ctx.save();
    this.ctx.translate(moveableObject.width, 0); //verursacht Verchiebung
    this.ctx.scale(-1, 1); //verursacht Spiegelung
    moveableObject.x = moveableObject.x * -1; //X-Achse spiegeln
  }

  flipImageBack(moveableObject) {
    moveableObject.x = moveableObject.x * -1;
    this.ctx.restore();
  }
}
