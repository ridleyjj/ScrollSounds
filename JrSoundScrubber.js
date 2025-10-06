class JrSoundScrubber {
    soundPlayer;

    constructor(fileName) {
        this.soundPlayer = new JrReversableSoundPlayer(fileName);
    }

    startAudio() {
        this.soundPlayer.vol.volume.rampTo(-5, 0.1);
    }

    stopAudio() {
        this.soundPlayer.vol.volume.rampTo(-80, 0.1);
    }

    updateAudioPlayback(rate) {
        this.soundPlayer.playbackRate = rate;
    }
}
