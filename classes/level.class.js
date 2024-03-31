class Level {
  enemies;
  clouds;
  backgroundObjects;
  endboss;
  levelEndX = 2500;

  constructor(enemies, clouds, backgroundObjects) {
    this.enemies = enemies;
    this.clouds = clouds;
    this.backgroundObjects = backgroundObjects;
  }
}
