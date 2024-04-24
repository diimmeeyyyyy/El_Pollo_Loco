class World {
  canvas;
  ctx;
  keyboard;
  camera_x = 0;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.gameCharacter = new Character();
    this.level = level1;
    this.gameOver = false;
    this.gameOver_sound = new Audio("audio/lost.mp3");
    this.gameWin = false;
    this.gameWin_sound = new Audio("audio/winMusic.mp3");
    this.allAudios = [
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
    this.collision = new Collision();
    this.endscreen = new Endscreen();
    this.statusBar_health = new StatusBar(30, 0, "health", 100);
    this.statusBar_coins = new StatusBar(30, 50, "coins", 0);
    this.statusBar_bottle = new StatusBar(30, 100, "bottle", 0);
    this.statusBar_endboss = new StatusBar(500, 0, "endboss", 100);
    this.throwableObjects = [];
    this.draw();
    this.setWorld();
    this.checkSound();
    this.checkConstantly();
  }

  /**
   * Used to check if sound is turned on/ off
   */
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
  /**
   * Continuously checks various game states and collisions
   */
  checkConstantly() {
    this.gameInterval = setInterval(() => {
      this.collision.checkGameInterval();
    }, 1000 / 60);
    this.collisionInterval = setInterval(() => {
      this.collision.checkCollisionInterval();
    }, 150);
    this.collisionIntervalChicken = setInterval(() => {
      this.collision.checkBottleCollisionChicken();
    }, 50);
  }

  /**
   * Sets the world property of gameCharacter, collision, and endscreen to this world instance
   */
  setWorld() {
    this.gameCharacter.world = this;
    this.collision.world = this;
    this.endscreen.world = this;
  }

  /**
   * Draws the game world on the canvas
   *
   * Function clears the canvas, translates the context based on the camera position,
   * adds various objects to the game, and then calls itself again using requestAnimationFrame
   * if game character is still alive.
   */
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
    if (this.gameCharacter.x >= this.level.enemies[7].x - 600) {
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

  /**
   * Adds multiple objects to the game
   *
   * @param {Array} objects - An array of objects to be added to the game
   */
  addObjectsToGame(objects) {
    objects.forEach((object) => {
      this.addToGame(object);
    });
  }

  /**
   *  Adds a moveable object to the game
   *
   * @param {Object} moveableObject - The object to be added to the game
   */
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

  /**
   * Flips the image of a moveable object in the game
   *
   * @param {Object} moveableObject - The object whose image is to be flipped
   */
  flipImage(moveableObject) {
    this.ctx.save();
    this.ctx.translate(moveableObject.width, 0); //verursacht Verchiebung
    this.ctx.scale(-1, 1); //verursacht Spiegelung
    moveableObject.x = moveableObject.x * -1; //X-Achse spiegeln
  }

  /**
   * Flips back the image of a moveable object in the game to its original state
   *
   * @param {object} moveableObject - The object whose image is to be flipped back
   */
  flipImageBack(moveableObject) {
    moveableObject.x = moveableObject.x * -1;
    this.ctx.restore();
  }
}
