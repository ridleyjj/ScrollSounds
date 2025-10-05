let scrollManager;
let cassette;
let soundScrubber;

let initialised = false;
let audioStarted = false;

var soundFile;

var fileName = "bowls_looped.wav";

var a = 0;

function preload() {
  soundFile = loadSound(fileName);
}

function setup() {
  let cnv = createCanvas(windowWidth, windowHeight);

  getAudioContext().suspend();

  jrMouseWheel = new JrScrollManager(cnv);
  cassette = new Cassette(width / 2, height / 2);
  soundScrubber = new JrSoundScrubber(soundFile);

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
    getAudioContext().resume().then(() => {
      // resolves when audio context successfully resumed
      audioStarted = true;
    })
  }
}

function touchStarted(event) {
  startAudio();
  event.preventDefault();
  jrMouseWheel.touchStarted(event);
}

function touchMoved(event) {
  event.preventDefault();
  jrMouseWheel.touchMoved(event);
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
  jrMouseWheel.tick();
  a = lerp(a, jrMouseWheel.acceleration, 0.1);
  if (abs(a) < 0.01) a = 0;

  soundScrubber.updateAudioPlayback(a);
  
  cassette.draw(a);
}
