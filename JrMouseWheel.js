class JrMouseWheel {
    delta = 0;
    maxDelta = 150;
    dragAmt = 1;
    acceleration = 0;

    constructor(cnv) {
        cnv.mouseWheel(this.applyMouseMovement.bind(this));
        // TODO copy same logic to touch scrolling
    }

    applyMouseMovement(event) {
        this.delta += event.deltaY;
        this.delta = constrain(this.delta, - this.maxDelta, this.maxDelta);
    }

    tick() {
        this.updateAcceleration();
        this.applyDrag();
    }

    updateAcceleration() {
        this.acceleration = lerp(0, this.delta, 0.04) / 6;
    }

    applyDrag() {
        if (abs(this.delta) < this.dragAmt) this.delta = 0;
        else if (this.delta < 0) {
            this.delta += this.dragAmt;
        } else {
            this.delta -= this.dragAmt;
        }
    }
};
