let level1;

function initLevel() {
  level1 = new Level(
    [
      new SalsaBottles(500),
      new SalsaBottles(600),
      new SalsaBottles(700),
      new SalsaBottles(1200),
      new SalsaBottles(1500),
      new SalsaBottles(2000),
    ],
    [
      new Coins(),
      new Coins(),
      new Coins(),
      new Coins(),
      new Coins(),
      new Coins(),
    ],
    [new Chicken(), new Chicken(), new Chicken(), new Endboss()],
    [new Clouds()],
    [
      new BackgroundObject("img/5_background/layers/air.png", -719, 720, 480), //NEWONE LEFT
      new BackgroundObject("img/5_background/layers/3_third_layer/1.png", -719),
      new BackgroundObject("img/5_background/layers/3_third_layer/2.png", -360),
      new BackgroundObject(
        "img/5_background/layers/2_second_layer/1.png",
        -719
      ),
      new BackgroundObject(
        "img/5_background/layers/2_second_layer/2.png",
        -360
      ),
      new BackgroundObject("img/5_background/layers/1_first_layer/1.png", -719),
      new BackgroundObject("img/5_background/layers/1_first_layer/2.png", -360),
      new BackgroundObject("img/5_background/layers/air.png", 0, 720, 480), //START
      new BackgroundObject("img/5_background/layers/3_third_layer/1.png", 0),
      new BackgroundObject("img/5_background/layers/3_third_layer/2.png", 360),
      new BackgroundObject("img/5_background/layers/2_second_layer/1.png", 0),
      new BackgroundObject("img/5_background/layers/2_second_layer/2.png", 360),
      new BackgroundObject("img/5_background/layers/1_first_layer/1.png", 0),
      new BackgroundObject("img/5_background/layers/1_first_layer/2.png", 360),
      new BackgroundObject("img/5_background/layers/air.png", 719, 720, 480), //NEWONE RIGHT
      new BackgroundObject("img/5_background/layers/3_third_layer/1.png", 719),
      new BackgroundObject("img/5_background/layers/3_third_layer/2.png", 1079),
      new BackgroundObject("img/5_background/layers/2_second_layer/1.png", 719),
      new BackgroundObject(
        "img/5_background/layers/2_second_layer/2.png",
        1079
      ),
      new BackgroundObject("img/5_background/layers/1_first_layer/1.png", 719),
      new BackgroundObject("img/5_background/layers/1_first_layer/2.png", 1079),
      new BackgroundObject("img/5_background/layers/air.png", 1438, 720, 480), //NEWONE RIGHT
      new BackgroundObject("img/5_background/layers/3_third_layer/1.png", 1438),
      new BackgroundObject("img/5_background/layers/3_third_layer/2.png", 1798),
      new BackgroundObject(
        "img/5_background/layers/2_second_layer/1.png",
        1438
      ),
      new BackgroundObject(
        "img/5_background/layers/2_second_layer/2.png",
        1798
      ),
      new BackgroundObject("img/5_background/layers/1_first_layer/1.png", 1438),
      new BackgroundObject("img/5_background/layers/1_first_layer/2.png", 1798),
      new BackgroundObject("img/5_background/layers/air.png", 2157, 720, 480), //NEWONE RIGHT
      new BackgroundObject("img/5_background/layers/3_third_layer/1.png", 2157),
      new BackgroundObject("img/5_background/layers/3_third_layer/2.png", 2517),
      new BackgroundObject(
        "img/5_background/layers/2_second_layer/1.png",
        2157
      ),
      new BackgroundObject(
        "img/5_background/layers/2_second_layer/2.png",
        2517
      ),
      new BackgroundObject("img/5_background/layers/1_first_layer/1.png", 2157),
      new BackgroundObject("img/5_background/layers/1_first_layer/2.png", 2517),
      new BackgroundObject("img/5_background/layers/air.png", 2876, 720, 480), //NEWONE RIGHT
      new BackgroundObject("img/5_background/layers/3_third_layer/1.png", 2876),
      new BackgroundObject("img/5_background/layers/3_third_layer/2.png", 3236),
      new BackgroundObject(
        "img/5_background/layers/2_second_layer/1.png",
        2876
      ),
      new BackgroundObject(
        "img/5_background/layers/2_second_layer/2.png",
        3236
      ),
      new BackgroundObject("img/5_background/layers/1_first_layer/1.png", 2876),
      new BackgroundObject("img/5_background/layers/1_first_layer/2.png", 3236),
    ]
  );
}
