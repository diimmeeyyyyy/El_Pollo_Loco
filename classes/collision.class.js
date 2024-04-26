class Collision {
  world;

  /**
   *  Checks various game conditions at regular intervals
   */
  checkGameInterval() {
    this.checkBottlesOnGround();
    this.checkCoins();
    this.CheckCharacterJump();
    this.checkCharacterLife();
    this.checkEndbossLife();
  }

  /**
   * Checks if the character is colliding with any bottles on the ground
   */
  checkBottlesOnGround() {
    this.world.level.salsaBottles = this.world.level.salsaBottles.filter(
      (bottle) => {
        if (
          this.world.gameCharacter.isColliding(bottle) &&
          this.world.gameCharacter.bottlesAmount !== 100
        ) {
          this.world.gameCharacter.isCollecting("bottle");
          this.world.statusBar_bottle.setPercentage(
            this.world.gameCharacter.bottlesAmount,
            "bottle"
          );
          // if character collides with bottle, i remove it from array
          return false;
        }
        // if character doesnt collide with bottle, i keep it in the game
        return true;
      }
    );
  }

  /**
   * Checks if the character is colliding with coins
   */
  checkCoins() {
    this.world.level.coins = this.world.level.coins.filter((coin) => {
      if (
        this.world.gameCharacter.isColliding(coin) &&
        this.world.gameCharacter.coinAmount !== 100
      ) {
        this.world.gameCharacter.isCollecting("coin");
        this.world.statusBar_coins.setPercentage(
          this.world.gameCharacter.coinAmount,
          "coins"
        );
        return false;
      }
      return true;
    });
  }

  /**
   * Checks if the character is jumping on any enemies
   */
  CheckCharacterJump() {
    this.world.level.enemies = this.world.level.enemies.filter((enemy) => {
      if (
        this.world.gameCharacter.isColliding(enemy) &&
        this.world.gameCharacter.isAboveGround() &&
        this.world.gameCharacter.speedY < 0 &&
        (enemy.enemyIsDead === false || enemy.smallEnemyIsDead === false)
      ) {
        let isDead = false;
        let sound = null;

        if (enemy instanceof Chicken) {
          enemy.enemyIsDead = true;
          sound = enemy.jump_on_chicken_sound;
          isDead = enemy.enemyIsDead;
        } else if (enemy instanceof ChickenSmall) {
          enemy.smallEnemyIsDead = true;
          sound = enemy.jump_on_small_chicken_sound;
          isDead = enemy.smallEnemyIsDead;
          enemy.y = 370;
        }

        enemy.img.src = enemy.IMAGES_DEAD;
        sound.play();

        if (isDead) {
          setTimeout(() => {
            enemy.img = null;
          }, 2000);
        }
      }
      return true;
    });
  }

  /**
   * Checks if the character is alive
   */
  checkCharacterLife() {
    if (this.world.gameCharacter.isAlive == false) {
      this.world.endscreen.stopGame();
      this.world.endscreen.showGameOverScreen();
      this.world.endscreen.removeMobileArrows();
    }
  }

  /**
   * Checks if the endboss is alive
   */
  checkEndbossLife() {
    if (
      this.world.level.enemies[this.world.level.enemies.length - 1]
        .endbossIsAlive === false
    ) {
      this.world.endscreen.stopGame();
      this.world.endscreen.removeMobileArrows();
      this.world.endscreen.showWinScreen();
    }
  }

  /**
   * Checks for collisions at regular intervals.
   */
  checkCollisionInterval() {
    this.checkCollisions();
    this.checkBottleCollision();
  }

  /**
   * Checks for collisions between the character and enemies
   */
  checkCollisions() {
    this.world.level.enemies.forEach((enemy) => {
      if (
        this.world.gameCharacter.isColliding(enemy) &&
        !this.world.gameCharacter.isDead(this.world.gameCharacter.energy)
      ) {
        if (
          !this.world.gameCharacter.isAboveGround() &&
          (enemy.enemyIsDead === false || enemy.smallEnemyIsDead === false)
        ) {
          this.world.gameCharacter.gotHitBy("NormalChicken");
        } else if (enemy instanceof Endboss && enemy.endbossIsAlive === true) {
          this.world.gameCharacter.gotHitBy("Endboss");
        }
        this.world.statusBar_health.setPercentage(
          this.world.gameCharacter.energy,
          "health"
        );
      }
    });
  }

  /**
   * Checks for collisions between thrown bottles and endboss
   */
  checkBottleCollision() {
    this.world.throwableObjects.forEach((bottle) => {
      this.world.level.enemies.forEach((enemy) => {
        if (bottle.isColliding(enemy)) {
          bottle.splash(bottle.x, bottle.y);
          if (enemy instanceof Endboss && !bottle.hasCollided) {
            bottle.hasCollided = true;
            enemy.endbossIsCollidingBottle();
            this.world.statusBar_endboss.setPercentage(
              enemy.endbossEnergy,
              "endboss"
            );
          }
        }
      });
    });
  }

  /**
   * Checks for collisions between thrown bottles and normal chickens
   */
  checkBottleCollisionChicken() {
    this.world.throwableObjects.forEach((bottle) => {
      this.world.level.enemies.forEach((enemy) => {
        if (bottle.isColliding(enemy) && !(enemy instanceof Endboss)) {
          let isDead = false;
          let sound = null;

          if (enemy instanceof Chicken) {
            enemy.enemyIsDead = true;
            sound = enemy.jump_on_chicken_sound;
            isDead = enemy.enemyIsDead;
          } else if (enemy instanceof ChickenSmall) {
            enemy.smallEnemyIsDead = true;
            sound = enemy.jump_on_small_chicken_sound;
            isDead = enemy.smallEnemyIsDead;
          }

          if (enemy.img) {
            // Check if enemy.img is not null
            enemy.img.src = enemy.IMAGES_DEAD;
            sound.play();
            if (isDead) {
              setTimeout(() => {
                enemy.img = null;
              }, 2000);
            }
          }
        }
      });
    });
  }
}
