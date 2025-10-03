let jrMouseWheel;
let cassette;

let initialised = false;

function setup() {
  let cnv = createCanvas(window.innerWidth, window.innerHeight);

  jrMouseWheel = new JrMouseWheel(cnv);
  cassette = new Cassette(width / 2, height / 2);

  initialised = true;
}

function draw() {
  if (!initialised) return;

  jrMouseWheel.tick();
  cassette.draw(jrMouseWheel.acceleration);
}
