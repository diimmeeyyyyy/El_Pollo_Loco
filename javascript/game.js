let canvas;
let world;

function init() {
  canvas = document.getElementById("Canvas");
  world = new World(canvas);
 
  console.log("My character is", world.gameCharacter)
}
