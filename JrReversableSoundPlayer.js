class JrReversableSoundPlayer {
    soundPlayer;
    reversePlayer;
    initialised = 0;
    isReversing = false;

    vol = new Tone.Volume(-80).toDestination();
    reverseVol = new Tone.Volume(-80).connect(this.vol);
    forwardVol = new Tone.Volume(0).connect(this.vol);

    playTime = 0;

    previousTime = undefined;

    constructor(fileName) {
        this.fileName = fileName;
        this.soundPlayer = this.initPlayer(false);
        this.reversePlayer = this.initPlayer(true);
    }

    initPlayer(reversed) {
        let newPlayer =  new Tone.Player({
            url: this.fileName,
            reverse: reversed,
            autostart: false,
            loop: true,
            playbackRate: 0,
        });
        if (reversed) {
            newPlayer.connect(this.reverseVol);
        } else {
            newPlayer.connect(this.forwardVol);
        }
        this.initialised++;
        return newPlayer;
    }

    startAudio() {
        this.soundPlayer.start();
        this.reversePlayer.start();
    }

    set playbackRate(rate) {
        if (this.initialised < 2) return;

        if (this.previousTime === undefined) {
            this.previousTime = millis();
        }

        let deltaTime = millis() - this.previousTime;
        this.previousTime = millis();
        this.playTime += (deltaTime * rate);
        this.playTime = JrUtils.constrainLoop(this.playTime, 0, this.soundPlayer.buffer.duration * 1000);

        if (rate < 0 && !this.isReversing) {
            this.isReversing = true;
            this.reversePlayer.seek((this.reversePlayer.buffer.duration * 1000 - this.playTime) / 1000);
            this.reverseVol.volume.rampTo(0, 0.1);
            this.forwardVol.volume.rampTo(-80, 0.1);
        } else if (rate > 0 && this.isReversing) {
            this.isReversing = false;
            this.soundPlayer.seek(this.playTime / 1000);
            this.reverseVol.volume.rampTo(-80, 0.1);
            this.forwardVol.volume.rampTo(0, 0.1);
        }
        
        let absRate = abs(rate);

        if (this.isReversing) {
            this.soundPlayer.playbackRate = 0;
            this.reversePlayer.playbackRate = absRate;
        } else {
            this.soundPlayer.playbackRate = absRate;
            this.reversePlayer.playbackRate = 0;
            
        }
        
    }
}
