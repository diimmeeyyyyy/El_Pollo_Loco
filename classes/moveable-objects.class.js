class MoveableObject {
  x = 120;
  y = 250;
  img;
  width = 100;
  height = 150;

  loadImage(path) {
    this.img = new Image(); //this.img = document.getElementById("image") <img id="image">
    this.img.src = path;
  }

  moveRight() {
    console.log("Hello world");
  }

  moveLeft() {}
}
