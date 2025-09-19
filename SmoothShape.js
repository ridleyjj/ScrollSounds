class JrSmoothShape {
    circleD = 80;
    circleR = this.circleD / 2;
    circleX = 0;
    circleY = 0;
    delta = 0;
    maxDelta = 150;
    dragAmt = 3;
    maxX = 0;

    constructor(cnv) {
        cnv.mouseWheel(this.applyMouseMovement.bind(this));
        this.circleX = cnv.width / 2;
        this.setCanvasSize(cnv.width, cnv.height);
    }

    applyMouseMovement(event) {
        this.delta += event.deltaY;
        this.delta = constrain(this.delta, - this.maxDelta, this.maxDelta);
    }

    setCanvasSize(width, height) {
        this.circleY = height / 2;
        
        this.maxX = width + this.circleR;
    }

    display() {
        this.calculateNewPosition();
        
        circle(this.circleX, this.circleY, this.circleD);

        this.applyDrag();
    }

    calculateNewPosition() {
        this.circleX += lerp(0, this.delta, 0.04);
        this.circleX = this.constrainLoop(this.circleX, -this.circleR, this.maxX);
    }

    /**
     * Loops a given value between min and max values, such that when it exceeds the max
     * it loops back to the min value
     * @returns The value, constrained and looped.
     */
    constrainLoop(num, min, max) {
        if (num < min) {
            num += max - min;
        } else if (num > max) {
            num -= max - min;
        }
        return num;
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
