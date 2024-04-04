class DrawableObject {
  x = 120;
  y = 350;
  img;
  imageCache = {};
  currentImage = 0;
  width = 100;
  height = 150;

  loadImage(path) {
    this.img = new Image(); //this.img = document.getElementById("image") <img id="image">
    this.img.src = path;
  }

  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  drawFrame(ctx) {
    if (
      this instanceof Character ||
      this instanceof Chicken ||
      this instanceof Endboss ||
      this instanceof SalsaBottles ||
      this instanceof Coins
    ) {
      // Draw the offset object in red
      ctx.beginPath();
      ctx.strokeStyle = "red";
      ctx.lineWidth = "5";
      ctx.rect(
        this.x + this.offset.left,
        this.y + this.offset.top,
        this.width - this.offset.left - this.offset.right,
        this.height - this.offset.top - this.offset.bottom
      );
      ctx.stroke();
    }
  }

  loadImages(array) {
    array.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }
}
