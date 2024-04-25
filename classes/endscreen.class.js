class Endscreen {
  world;

  /**
   * Displays the game over screen
   */
  showGameOverScreen() {
    let gameOverScreen = document.getElementById("Game_Over_Screen");
    gameOverScreen.classList.remove("d-none");
  }

  /**
   * Stops the game by clearing all intervals
   */
  stopGame() {
    clearInterval(this.world.gameInterval);
    clearInterval(this.world.collisionInterval);

    this.world.level.enemies.forEach((enemy) => {
      clearInterval(enemy.chickenMovementInterval);
      clearInterval(enemy.chickenMovementInterval);
      clearInterval(enemy.smallChickenMovementInterval);
      clearInterval(enemy.smallChickenAnimationInterval);
      clearInterval(enemy.smallChickenDirectionChangeInterval);
      clearInterval(enemy.endbossAlertAnimation);
      clearInterval(enemy.endbossDamageInterval);
      clearInterval(enemy.endbossWakingAnimation);
      clearInterval(enemy.endbossWalkingMovement);
    });

    clearInterval(this.world.gameCharacter.characterMovementInterval);
    clearInterval(this.world.gameCharacter.characterAnimationInterval);
    this.removeThrowEventListener();
  }

  /**
   * Removes the event listener for throwing bottles
   */
  removeThrowEventListener() {
    if (this.world.gameCharacter.bottleThrowHandler) {
      document.removeEventListener(
        "keydown",
        this.world.gameCharacter.bottleThrowHandler
      );
    }
  }

  /**
   *  Removes the mobile movement buttons from the screen
   */
  removeMobileArrows() {
    let allButtons = document.querySelectorAll(".mobile-movement");
    allButtons.forEach((button) => {
      button.style.display = "none";
    });
  }

  /**
   * Displays the winning screen
   */
  showWinScreen() {
    let winningScreen = document.getElementById("Win_Screen");
    winningScreen.classList.remove("d-none");
    this.world.gameWin = true;
    this.world.checkSound();
  }
}
