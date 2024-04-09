class Keyboard {
  LEFT = false;
  RIGHT = false;
  UP = false;
  DOWN = false;
  SPACE = false;
  D = false;

  constructor() {
    this.bindKeyPressEvents();
    /* this.bindButtonPressEvents(); */
  }
  
  bindKeyPressEvents() {
    document.addEventListener("keydown", (event) => {
      /* console.log(event.keyCode); */
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
      /*   console.log(event); */
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

 /*  bindButtonPressEvents() {
    document
      .getElementById("Walk_Left_Button")
      .addEventListener("touchstart", (e) => {
        e.preventDefault();
        this.LEFT = true;
      });

    document
      .getElementById("Walk_Left_Button")
      .addEventListener("touchend", (e) => {
        e.preventDefault();
        this.LEFT = false;
      });

    document
      .getElementById("Walk_Right_Button")
      .addEventListener("touchstart", (e) => {
        e.preventDefault();
        this.RIGHT = true;
      });

    document
      .getElementById("Walk_Right_Button")
      .addEventListener("touchend", (e) => {
        e.preventDefault();
        this.RIGHT = false;
      });
  } */
}
