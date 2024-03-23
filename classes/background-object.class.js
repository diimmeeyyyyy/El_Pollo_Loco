class BackgroundObject extends MoveableObject {
  /* width = 360;
  height = 400; */
  constructor(imagePath, x, width = 360, height = 400) {
    super().loadImage(imagePath);
    this.height = height;
    this.width = width;
    this.x = x;
    this.y = 480 - this.height; //480 (Höhe des Canvas) - 400 (Höhe von Bild)
  }
}
