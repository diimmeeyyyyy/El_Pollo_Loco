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
        if (this.characterIsCollidingWith(bottle)) {
          this.updateBottleAmount();
          return false;
        }
        return true;
      }
    );
  }

  /**
   * Updates the game character's bottle collection status and the status bar to reflect the current bottle amount of the game character
   */
  updateBottleAmount() {
    this.world.gameCharacter.isCollecting("bottle");
    this.world.statusBar_bottle.setPercentage(
      this.world.gameCharacter.bottlesAmount,
      "bottle"
    );
  }

  /**
   * Checks if the character is colliding with coins
   */
  checkCoins() {
    this.world.level.coins = this.world.level.coins.filter((coin) => {
      if (this.characterIsCollidingWith(coin)) {
        this.updateCoinAmount();
        return false;
      }
      return true;
    });
  }

  /**
   * Checks if the game character is colliding with a given coin and if the game character's coin amount is not equal to 100
   * @param {*} coin - The coin object to check for a collision with the game character
   * @returns {boolean} - Returns true if the game character is colliding with the coin and the game character's coin amount is not equal to 100, otherwise false
   */
  characterIsCollidingWith(collectableObject) {
    let collectableObjectAmount;
    if (collectableObject instanceof Coins) {
      collectableObjectAmount = this.world.gameCharacter.coinAmount;
    } else if (collectableObject instanceof SalsaBottles) {
      collectableObjectAmount = this.world.gameCharacter.bottlesAmount;
    }

    return (
      this.world.gameCharacter.isColliding(collectableObject) &&
      collectableObjectAmount !== 100
    );
  }

  /**
   * Updates the game character's coin collection status and the status bar to reflect the current coin amount of the game character
   * @returns {boolean} - Always returns false to let disappear
   */
  updateCoinAmount() {
    this.world.gameCharacter.isCollecting("coin");
    this.world.statusBar_coins.setPercentage(
      this.world.gameCharacter.coinAmount,
      "coins"
    );
  }

  /**
   * Checks if the character is jumping on any enemies
   */
  CheckCharacterJump() {
    this.world.level.enemies = this.world.level.enemies.filter((enemy) => {
      if (this.characterIsJumpingOnEnemy(enemy)) {
        if (enemy instanceof Chicken) {
          this.handleChickenCollision(enemy);
        } else if (enemy instanceof ChickenSmall) {
          this.handleChickenSmallCollision(enemy);
        }
      }
      return true;
    });
  }

  /**
   * Checks if the game character is jumping on an enemy
   * @param {object} enemy - Enemy object to check for a collision with the game character from above
   * @returns {boolean}  - Returns true if the game character is colliding with the enemy, is above the ground, moving downwards (indicating a jump), and the enemy is not dead, otherwise false.
   */
  characterIsJumpingOnEnemy(enemy) {
    return (
      this.world.gameCharacter.isColliding(enemy) &&
      this.world.gameCharacter.isAboveGround() &&
      this.world.gameCharacter.speedY < 0 &&
      (enemy.enemyIsDead === false || enemy.smallEnemyIsDead === false)
    );
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
      if (this.characterCollides(enemy)) {
        if (this.enemyIsNormalChicken(enemy)) {
          this.world.gameCharacter.gotHitBy("NormalChicken");
        } else if (this.enemyIsEndboss(enemy)) {
          this.world.gameCharacter.gotHitBy("Endboss");
        }
        this.updateStatusBarCharacterEnergy();
      }
    });
  }

  /**
   * Checks if the game character is colliding with an enemy and if the game character is not dead
   * @param {object} enemy - Enemy object to check for a collision with the game character
   * @returns {boolean} - Returns true if the game character is colliding with the enemy and the game character is not dead, otherwise false
   */
  characterCollides(enemy) {
    return (
      this.world.gameCharacter.isColliding(enemy) &&
      this.world.gameCharacter.isAlive == true
    );
  }

  /**
   * Checks if the enemy is a normal chicken (brown or yellow ones)
   * @param {object} enemy - Enemy object to check for a collision with the game character
   * @returns {boolean} - Returns true if the game character is colliding with a normal chicken which isnt dead already, otherwise false
   */
  enemyIsNormalChicken(enemy) {
    return (
      !this.world.gameCharacter.isAboveGround() &&
      (enemy instanceof Chicken || enemy instanceof ChickenSmall) &&
      (enemy.enemyIsDead === false || enemy.smallEnemyIsDead === false)
    );
  }

  /**
   * Checks if enemy is an instance of Endboss and if the Endboss is alive
   * @param {object} enemy - Enemy object to check for a collision with the game character
   * @returns {boolean} - Returns true if the game character is colliding with the endboss which isnt dead already, otherwise false
   */
  enemyIsEndboss(enemy) {
    return enemy instanceof Endboss && enemy.endbossIsAlive === true;
  }

  /**
   * Updates the status bar to reflect the current energy level of the game character
   */
  updateStatusBarCharacterEnergy() {
    this.world.statusBar_health.setPercentage(
      this.world.gameCharacter.energy,
      "health"
    );
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
   * Checks for collisions between thrown bottles and normal or small chickens
   */
  checkBottleCollisionChicken() {
    this.world.throwableObjects.forEach((bottle) => {
      this.world.level.enemies.forEach((enemy) => {
        if (bottle.isColliding(enemy) && !(enemy instanceof Endboss)) {
          if (enemy instanceof Chicken) {
            this.handleChickenCollision(enemy);
          } else if (enemy instanceof ChickenSmall) {
            this.handleChickenSmallCollision(enemy);
          }
        }
      });
    });
  }

  /**
   * Handles the collision with a Chicken enemy
   * @param {object} enemy - The enemy object that the bottle is colliding with
   */
  handleChickenCollision(enemy) {
    enemy.enemyIsDead = true;
    let sound = enemy.jump_on_chicken_sound;
    let isDead = enemy.enemyIsDead;
    this.handleDeadEnemy(enemy, sound, isDead);
  }

  /**
   * Handles the collision with a small Chicken enemy
   * @param {object} enemy - The enemy object that the bottle is colliding with
   */
  handleChickenSmallCollision(enemy) {
    enemy.smallEnemyIsDead = true;
    let sound = enemy.jump_on_small_chicken_sound;
    let isDead = enemy.smallEnemyIsDead;
    enemy.y = 370;
    this.handleDeadEnemy(enemy, sound, isDead);
  }

  /**
   * Handles the actions to be performed when an enemy is dead
   * @param {object} enemy - The enemy object that the bottle is colliding with
   * @param {object} sound - The sound to play when the enemy is hit
   * @param {boolean} isDead - The current status of the enemy
   */
  handleDeadEnemy(enemy, sound, isDead) {
    if (enemy.img) {
      enemy.img.src = enemy.IMAGES_DEAD;
      sound.play();
      if (isDead) {
        setTimeout(() => {
          enemy.img = null;
        }, 2000);
      }
    }
  }
}
