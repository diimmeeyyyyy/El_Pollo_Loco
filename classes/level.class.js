class Level {
  salsaBottles;
  coins;
  enemies;
  clouds;
  backgroundObjects;
  endboss;
  levelEndX = 2900;

  /**
   * Constructor for the Level class.
   * @param {Array} salsaBottles - The array of salsa bottles in the level
   * @param {Array} coins - The array of coins in the level
   * @param {Array} enemies - The array of enemies in the level
   * @param {Array} clouds - The array of clouds in the level
   * @param {Array} backgroundObjects - The array of background objects in the level
   */
  constructor(salsaBottles, coins, enemies, clouds, backgroundObjects) {
    this.salsaBottles = salsaBottles;
    this.coins = coins;
    this.enemies = enemies;
    this.clouds = clouds;
    this.backgroundObjects = backgroundObjects;
  }
}
