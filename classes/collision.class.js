class Collision {
  world;

  checkGameInterval() {
    this.checkBottlesOnGround();
    this.checkCoins();
    this.CheckCharacterJump();
    this.checkCharacterLife();
    this.checkEndbossLife();
  }

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

  CheckCharacterJump() {
    this.world.level.enemies = this.world.level.enemies.filter((enemy) => {
      if (
        this.world.gameCharacter.isColliding(enemy) &&
        this.world.gameCharacter.isAboveGround() &&
        this.world.gameCharacter.speedY < 0 &&
        enemy.enemyIsdead === false
      ) {
        console.log("Character is jumping on enemy");
        if (enemy instanceof Chicken) {
          enemy.enemyIsdead = true;
          enemy.img.src = enemy.IMAGES_DEAD;
          enemy.jump_on_chicken_sound.play();
          if (enemy.enemyIsdead) {
            setTimeout(() => {
              enemy.img = null;
            }, 2000);
          }
        }
        /* return false; */
        //add animation of dead chicken
      }
      return true;
    });
  }

  checkCharacterLife() {
    if (this.world.gameCharacter.isAlive == false) {
      this.world.stopGame();
      this.world.showGameOverScreen();
      this.world.removeMobileArrows();
    }
  }

  checkEndbossLife() {
    if (
      this.world.level.enemies[this.world.level.enemies.length - 1]
        .endbossIsAlive === false
    ) {
      this.world.stopGame();
      this.world.removeMobileArrows();
    }
  }

  checkCollisionInterval() {
    this.checkCollisions();
    this.checkThrowableObjects();
    this.checkBottleCollision();
  }

  checkCollisions() {
    this.world.level.enemies.forEach((enemy) => {
      if (
        this.world.gameCharacter.isColliding(enemy) &&
        !this.world.gameCharacter.isAboveGround() &&
        enemy.enemyIsdead === false
      ) {
        this.world.gameCharacter.hit();
        this.world.statusBar_health.setPercentage(
          this.world.gameCharacter.energy,
          "health"
        );
      }
    });
  }

  checkThrowableObjects() {
    if (this.world.keyboard.D && this.world.gameCharacter.bottlesAmount > 0) {
      this.world.gameCharacter.idleTimer = 0;
      let bottle = new ThrowableObject(
        this.world.gameCharacter.x + 100,
        this.world.gameCharacter.y
      );
      this.world.throwableObjects.push(bottle);
      this.world.gameCharacter.bottlesAmount -= 20;
      this.world.statusBar_bottle.setPercentage(
        this.world.gameCharacter.bottlesAmount,
        "bottle"
      );
    }
  }

  checkBottleCollision() {
    this.world.throwableObjects.forEach((bottle) => {
      this.world.level.enemies.forEach((enemy) => {
        if (bottle.isColliding(enemy)) {
          if (enemy instanceof Endboss) {
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
}
