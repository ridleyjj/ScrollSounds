let scrollManager;
let cassette;

let initialised = false;

let pagePadding = 15;
let canvasHeight = 300;

let canvasElement;

let handwritingFont = "Caveat-VariableFont_wght";
let boldFont = "BowlbyOneSC-Regular";

let bg = { r: 76, g: 159, b: 231 };

function preload() {
  loadFont("cassette/fonts/" + boldFont + ".ttf");
  loadFont("cassette/fonts/" + handwritingFont + ".ttf");
}

function setup() {
  canvasElement = document.getElementById("cassette")

  createCanvas(window.innerWidth - (2 * pagePadding), canvasHeight, "P2D", canvasElement);

  scrollManager = new JrScrollManager();
  cassette = new Cassette(width / 2, height / 2, bg);

  initialised = true;
}

function windowResized() {
  resizeCanvas(window.innerWidth - (2 * pagePadding), canvasHeight);
  cassette.setCassettePosition(width / 2, height / 2);
}

function draw() {
  if (!initialised) return;

  fill(bg.r, bg.g, bg.b);

  scrollManager.tick();

  cassette.draw(scrollManager.a);
}
