class Endscreen {
  /* constructor(world) {
    this.world = world;
  } */
  world;

  showGameOverScreen() {
    /* this.world.gameOver = true;
    this.world.checkSound(); */
    let gameOverScreen = document.getElementById("Game_Over_Screen");
    gameOverScreen.classList.remove("d-none");
  }

  stopGame() {
    clearInterval(this.world.gameInterval);
    clearInterval(this.world.collisionInterval);

    this.world.level.enemies.forEach((enemy) => {
      clearInterval(enemy.chickenMovementInterval);
      clearInterval(enemy.chickenMovementInterval);
      clearInterval(enemy.smallChickenMovementInterval);
      clearInterval(enemy.smallChickenAnimationInterval);
      clearInterval(enemy.smallChickenDirectionChangeInterval);
      clearInterval(enemy.endbossDamageInterval);
      clearInterval(enemy.endbossWakingAnimation);
      clearInterval(enemy.endbossWalkingMovement);
    });

    clearInterval(this.world.gameCharacter.characterMovementInterval);
    clearInterval(this.world.gameCharacter.characterAnimationInterval);
    this.removeThrowEventListener();
  }

  removeThrowEventListener() {
    if (this.world.gameCharacter.bottleThrowHandler) {
      document.removeEventListener(
        "keydown",
        this.world.gameCharacter.bottleThrowHandler
      );
    }
  }

  removeMobileArrows() {
    let allButtons = document.querySelectorAll(".mobile-movement");
    allButtons.forEach((button) => {
      button.style.display = "none";
    });
  }

  showWinScreen() {
    let winningScreen = document.getElementById("Win_Screen");
    winningScreen.classList.remove("d-none");
    this.world.gameWin = true;
    this.world.checkSound();
  }
}
