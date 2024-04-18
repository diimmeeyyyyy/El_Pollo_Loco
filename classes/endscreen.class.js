class Endscreen {
  /* constructor(world) {
    this.world = world;
  } */
  world;

  showGameOverScreen() {
    let gameOverScreen = document.getElementById("Game_Over_Screen");
    gameOverScreen.classList.remove("d-none");
    this.world.gameOver = true;
    this.world.checkSound();
  }

  stopGame() {
    clearInterval(this.world.gameInterval);
    clearInterval(this.world.collisionInterval);

    this.world.level.enemies.forEach((enemy) => {
      clearInterval(enemy.chickenInterval1);
      clearInterval(enemy.chickenInterval2);
      clearInterval(enemy.smallChickenJumpInterval);
      clearInterval(enemy.endbossDamageInterval);
      clearInterval(enemy.endbossWakingAnimation);
      clearInterval(enemy.endbossWalkingMovement);
    });

    clearInterval(this.world.gameCharacter.characterMovementInterval);
    clearInterval(this.world.gameCharacter.characterAnimationInterval);
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
