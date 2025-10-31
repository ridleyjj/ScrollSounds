class JrScrollManager {
    prevScrollY = 0;
    maxDiff = 200;
    a = 0;
    lastUpdate = 0;
    dragDelay = 500; // ms
    dragDampening = 0.97;
    zeroLimit = 0.01; // limit at which point a is clamped to 0;

    tick() {
        let diff = window.scrollY - this.prevScrollY;

        this.prevScrollY = window.scrollY;

        diff = map(diff, -this.maxDiff, this.maxDiff, -1, 1, true);

        this.a += diff;

        this.a = constrain(this.a, -1, 1);

        if (diff !== 0) {
            this.lastUpdate = millis();
        }

        // apply drag/dampening
        if (this.a !== 0 && (millis() - this.lastUpdate) > this.dragDelay) {
            this.a *= this.dragDampening;
            if (this.a > -this.zeroLimit && this.a < this.zeroLimit) this.a = 0;
        }
    }
};
