let scrollManager;
let cassette;

let initialised = false;

var a = 0;

handwritingFont = "Caveat-VariableFont_wght";
boldFont = "BowlbyOneSC-Regular";

function preload() {
  loadFont("fonts/" + boldFont + ".ttf");
  loadFont("fonts/" + handwritingFont + ".ttf");
}

function setup() {
  const existingCnv = document.getElementById("cassette")

  let cnv = createCanvas(500, 500, "P2D", existingCnv);

  scrollManager = new JrScrollManager(cnv);
  cassette = new Cassette(width / 2, height / 2);

  initialised = true;
}

// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
//   cassette.setCassettePosition(width / 2, height / 2);
// }

function touchStarted(event) {
  scrollManager.touchStarted(event);
}

function touchMoved(event) {
  scrollManager.touchMoved(event);
}

function draw() {
  if (!initialised) return;

  background(255, 255, 255);

  // acceleration
  scrollManager.tick();
  a = lerp(a, scrollManager.acceleration, 0.1);
  if (abs(a) < 0.01) a = 0;
  
  cassette.draw(a);
}
