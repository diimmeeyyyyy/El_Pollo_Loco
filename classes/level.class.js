class Level {
  salsaBottles;
  enemies;
  clouds;
  backgroundObjects;
  endboss;
  levelEndX = 2500;

  constructor(salsaBottles, enemies, clouds, backgroundObjects) {
    this.salsaBottles = salsaBottles;
    this.enemies = enemies;
    this.clouds = clouds;
    this.backgroundObjects = backgroundObjects;
  }
}
