class DrawableObject {
  x = 120;
  y = 350;
  img;
  imageCache = {};
  currentImage = 0;
  width = 100;
  height = 150;

  /**
   * Loads an image from a given path
   * @param {string} path - Path to the image file
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   * Draws the object on the canvas
   * @param {CanvasRenderingContext2D} ctx - The rendering context of the canvas
   */
  draw(ctx) {
    if (this.img) {
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
  }

  /**
   * Loads multiple images from an array of paths
   * @param {array<string>} array - The array of paths to the image files
   */
  loadImages(array) {
    array.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }
}
