let smoothShape;

let initialised = false;

function setup() {
  let cnv = createCanvas(600, 600);

  smoothShape = new JrSmoothShape(cnv);

  initialised = true;
}

function draw() {
  if (!initialised) return;

  background(220);

  smoothShape.display();
}
