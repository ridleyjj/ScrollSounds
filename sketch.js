let jrMouseWheel;
let cassette;
let soundScrubber;

let initialised = false;
let audioStarted = false;

var sound;
var reversedSound;

var fileName = "bowls.wav";

var a = 0;

function preload() {
  sound = loadSound(fileName);
  reversedSound = loadSound(fileName);
}

function setup() {
  let cnv = createCanvas(window.innerWidth, window.innerHeight);

  getAudioContext().suspend();

  jrMouseWheel = new JrMouseWheel(cnv);
  cassette = new Cassette(width / 2, height / 2);
  soundScrubber = new JrSoundScrubber(sound, reversedSound);

  initialised = true;
}

function mousePressed() {
  if (!audioStarted) {
    getAudioContext().resume();
    audioStarted = true;
  }
}

function draw() {
  if (!initialised) return;

  background(255, 255, 255);

  if (!audioStarted) {
    text("click to start audio", cassette.x + cassette.width * 0.32, cassette.y - 6);
  }

  // acceleration
  jrMouseWheel.tick();
  a = lerp(a, jrMouseWheel.acceleration, 0.1);
  if (abs(a) < 0.01) a = 0;

  soundScrubber.updateAudioPlayback(a);
  
  cassette.draw(a);
}
