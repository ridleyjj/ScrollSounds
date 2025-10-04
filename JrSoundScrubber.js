class JrSoundScrubber {
    forwardSound;
    reversedSound;

    constructor(forwardSound, reversedSound) {
        this.forwardSound = forwardSound;
        this.reversedSound = reversedSound;

        this.reversedSound.reverseBuffer();
  
        this.initAudioFile(this.forwardSound);
        this.initAudioFile(this.reversedSound);
    }

    initAudioFile(soundFile) {
        soundFile.play();
        soundFile.setLoop(true);
        soundFile.rate(0);
        soundFile.jump(5);
    }

    updateAudioPlayback(rate) {
        if (rate < 0) {
            this.reversedSound.rate(-rate);
            this.forwardSound.rate(0);
        } else {
            this.forwardSound.rate(rate);
            this.reversedSound.rate(0);
        }
    }
}
