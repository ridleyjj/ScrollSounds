class JrScrollManager {
    delta = 0;
    maxDelta = 150;
    dragAmt = 1;
    acceleration = 0;

    constructor(cnv) {
        cnv.mouseWheel(this.applyMouseMovement.bind(this));

        cnv.elt.addEventListener('wheel', function(e) {
        e.preventDefault();
        e.stopPropagation();

        return false;
    });
    }

    applyMouseMovement(event) {
        this.incrementDelta(event.deltaY);
    }

    incrementDelta(newDeltaY) {
        this.delta += newDeltaY;
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

    // touch logic
    touchPosY = undefined;

    touchStarted(event) {
        if (event == undefined || event.changedTouches == undefined || event.changedTouches[0] == undefined) return;

        this.touchPosY = event.changedTouches[0].pageY;
    }

    touchMoved(event) {
        if (event == undefined || event.changedTouches == undefined || event.changedTouches[0] == undefined) return;
        
        let newPosY = event.changedTouches[0].pageY;

        if (this.touchPosY == undefined) this.touchPosY = newPosY;

        this.incrementDelta(newPosY - this.touchPosY);
    }
};
