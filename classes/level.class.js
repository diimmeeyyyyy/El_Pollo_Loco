class Level {
  enemies;
  clouds;
  backgroundObjects;
  endboss;
  levelEndX = 700;

  constructor(enemies, clouds, backgroundObjects) {
    this.enemies = enemies;
    this.clouds = clouds;
    this.backgroundObjects = backgroundObjects;
  }
}
