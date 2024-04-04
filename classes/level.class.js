class Level {
  salsaBottles;
  coins;
  enemies;
  clouds;
  backgroundObjects;
  endboss;
  levelEndX = 2500;

  constructor(salsaBottles, coins, enemies, clouds, backgroundObjects) {
    this.salsaBottles = salsaBottles;
    this.coins = coins;
    this.enemies = enemies;
    this.clouds = clouds;
    this.backgroundObjects = backgroundObjects;
  }
}
