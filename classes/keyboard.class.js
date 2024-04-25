class Keyboard {
  LEFT = false;
  RIGHT = false;
  UP = false;
  DOWN = false;
  SPACE = false;
  D = false;

  /**
   * Constructor for the Keyboard class
   */
  constructor() {
    this.bindKeyPressEvents();
  }

  /**
   * Binds key press events to their respective handlers
   */
  bindKeyPressEvents() {
    document.addEventListener("keydown", (event) => {
      if (event.keyCode == 39) {
        keyboard.RIGHT = true;
      }

      if (event.keyCode == 37) {
        keyboard.LEFT = true;
      }

      if (event.keyCode == 38) {
        keyboard.UP = true;
      }

      if (event.keyCode == 40) {
        keyboard.DOWN = true;
      }

      if (event.keyCode == 32) {
        keyboard.SPACE = true;
      }

      if (event.keyCode == 68) {
        keyboard.D = true;
      }
    });

    document.addEventListener("keyup", (event) => {
      if (event.keyCode == 39) {
        keyboard.RIGHT = false;
      }

      if (event.keyCode == 37) {
        keyboard.LEFT = false;
      }

      if (event.keyCode == 38) {
        keyboard.UP = false;
      }

      if (event.keyCode == 40) {
        keyboard.DOWN = false;
      }

      if (event.keyCode == 32) {
        keyboard.SPACE = false;
      }

      if (event.keyCode == 68) {
        keyboard.D = false;
      }
    });
  }

  /**
   * Binds touch events to their respective handlers for mobile devices
   * @param {*} world - The game world
   * 
   * * It adds event listeners for the touchstart and touchend events on the mobile control buttons
   * When a button is pressed (touchstart), the corresponding property on the keyboard object is set to true
   * When a button is released (touchend), the corresponding property on the keyboard object is set to false
   */
  bindButtonPressEvents(world) {
    //WALK LEFT
    document
      .getElementById("Walk_Left_Button")
      .addEventListener("touchstart", (e) => {
        e.preventDefault();
        keyboard.LEFT = true;
      });

    document
      .getElementById("Walk_Left_Button")
      .addEventListener("touchend", (e) => {
        e.preventDefault();
        keyboard.LEFT = false;
      });

    //WALK RIGHT
    document
      .getElementById("Walk_Right_Button")
      .addEventListener("touchstart", (e) => {
        e.preventDefault();
        keyboard.RIGHT = true;
      });

    document
      .getElementById("Walk_Right_Button")
      .addEventListener("touchend", (e) => {
        e.preventDefault();
        keyboard.RIGHT = false;
      });

    //JUMP
    document
      .getElementById("Jump_Button")
      .addEventListener("touchstart", (e) => {
        e.preventDefault();
        keyboard.SPACE = true;
      });

    document.getElementById("Jump_Button").addEventListener("touchend", (e) => {
      e.preventDefault();
      keyboard.SPACE = false;
    });

    //THROW BOTTLE
    document
      .getElementById("Throw_Bottle")
      .addEventListener("touchstart", (e) => {
        world.gameCharacter.throwBottle();
      });
  }
}
