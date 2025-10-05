class JrSoundScrubber {
    forwardSound;
    reversedSound;

    constructor(forwardSound) {
        this.forwardSound = forwardSound;
        this.reversedSound = new p5.SoundFile();
        this.reversedSound.buffer = this.copyBuffer(forwardSound.buffer);

        this.reversedSound.reverseBuffer();
  
        this.initAudioFile(this.forwardSound);
        this.initAudioFile(this.reversedSound);
    }

    /** 
     * returns deep copy of provided audio buffer
     * avoids having to load a single file twice
    */
    copyBuffer(buffer) {
    let newBuffer = getAudioContext().createBuffer(
        buffer.numberOfChannels,
        buffer.length,
        buffer.sampleRate
    );
    for (let i = 0; i < buffer.numberOfChannels; i++) {
        newBuffer.getChannelData(i).set(buffer.getChannelData(i));
    }
    return newBuffer;
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
