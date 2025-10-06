let scrollManager;
let cassette;
let soundScrubber;

let initialised = false;
let audioStarted = false;

var soundFile;

var fileName = "bowls_looped.wav";

var a = 0;

handwritingFont = "Caveat-VariableFont_wght";
boldFont = "BowlbyOneSC-Regular";

function preload() {
  loadFont("fonts/" + boldFont + ".ttf");
  loadFont("fonts/" + handwritingFont + ".ttf");
}

function setup() {
  let cnv = createCanvas(windowWidth, windowHeight);

  scrollManager = new JrScrollManager(cnv);
  cassette = new Cassette(width / 2, height / 2);
  soundScrubber = new JrSoundScrubber(fileName);

  initialised = true;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  cassette.setCassettePosition(width / 2, height / 2);
}

function mousePressed() {
  startAudio();
}

function startAudio() {
  if (!audioStarted) {
    Tone.start().then(() => {
      audioStarted = true;
      soundScrubber.startAudio();
    });
  }
}

function touchStarted(event) {
  startAudio();
  event.preventDefault();
  scrollManager.touchStarted(event);
}

function touchMoved(event) {
  event.preventDefault();
  scrollManager.touchMoved(event);
}

function draw() {
  if (!initialised) return;

  background(255, 255, 255);

  if (!audioStarted) {
    textFont('Courier New', cassette.height * 0.08)
    fill(0, 0, 0);
    text("click to start audio", cassette.x + cassette.width * 0.2, cassette.y + cassette.height * 1.085);
  }

  // acceleration
  scrollManager.tick();
  a = lerp(a, scrollManager.acceleration, 0.1);
  if (abs(a) < 0.01) a = 0;

  soundScrubber.updateAudioPlayback(a);
  
  cassette.draw(a);
}
