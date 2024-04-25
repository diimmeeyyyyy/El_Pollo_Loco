class BackgroundObject extends MoveableObject {
  
  /**
   * 
   * @param {*} imagePath - Path to the image that will be used for this background object
   * @param {*} x - Initial x-coordinate for this background object
   * @param {*} width - Width of this background object, defaults to 360 if not provided
   * @param {*} height  - Height of this background object, defaults to 400 if not provided
   */
  constructor(imagePath, x, width = 360, height = 400) {
    super().loadImage(imagePath);
    this.height = height;
    this.width = width;
    this.x = x;
    this.y = 480 - this.height; //480 (Height of Canvas) - 400 (Height of IMG)
  }
}
