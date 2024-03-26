class Level {
  enemies;
  clouds;
  backgroundObjects;
  endboss;
  levelEndX = 1079;

  constructor(enemies, clouds, backgroundObjects) {
    this.enemies = enemies;
    this.clouds = clouds;
    this.backgroundObjects = backgroundObjects;
  }
}
