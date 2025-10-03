class Cassette {

    height = 200;
    width = this.height * 1.6;
    padding = this.height * 0.06;
    cornerCircleSize = this.height * 0.04;

    constructor(x, y) {
        this.x = x - this.width / 2;
        this.y = y - this.height / 2;
        this.rightX = this.x + this.width - this.padding;
        this.leftX = this.x + this.padding;
        this.topY = this.y + this.padding;
        this.bottomY = this.y + this.height - this.padding;
    }

    offset = 0;

    draw(acceleration) {
        // stroke weight calibrated to 4 for height of 200 - may adjust this later
        strokeWeight(this.height * 0.02);

        // main body
        fill(240, 195, 72);
        rect(this.x, this.y, this.width, this.height, 5);

        // TODO - clean up this drawing logic

        // bottom section
        beginShape();
        let shapeX = this.x + this.width * 0.2;
        let shapeY = this.y + this.height;
        vertex(shapeX, shapeY);
        shapeX += this.width * 0.04;
        shapeY -= this.height * 0.23;
        vertex(shapeX, shapeY);
        shapeX += this.width * 0.52;
        vertex(shapeX, shapeY);
        shapeX += this.width * 0.04;
        shapeY += this.height * 0.23;
        vertex(shapeX, shapeY);
        endShape(CLOSE);
        
        // holes
        circle(this.rightX, this.topY, this.cornerCircleSize);
        circle(this.rightX, this.bottomY, this.cornerCircleSize);
        circle(this.leftX, this.topY, this.cornerCircleSize);
        circle(this.leftX, this.bottomY, this.cornerCircleSize);
        
        circle(this.leftX + this.width * 0.25, this.bottomY - 3, this.cornerCircleSize);
        circle(this.rightX - this.width * 0.25, this.bottomY - 3, this.cornerCircleSize);
        circle(this.x + this.width * 0.5, this.bottomY - this.height * 0.09, this.cornerCircleSize);

        // middle section
        fill(222, 81, 20);
        beginShape();
        shapeX = this.x + this.width * 0.07;
        shapeY = this.y + this.height * 0.65;
        vertex(shapeX, shapeY);
        shapeY -= this.height * 0.4;
        vertex(shapeX, shapeY);
        shapeX += this.width * 0.08;
        shapeY -= this.height * 0.15;
        vertex(shapeX, shapeY);
        shapeX = this.x + this.width * 0.85;
        vertex(shapeX, shapeY);
        shapeX += this.width * 0.08;
        shapeY += this.height * 0.15;
        vertex(shapeX, shapeY);
        shapeY += this.height * 0.4;
        vertex(shapeX, shapeY);
        endShape(CLOSE);

        // cutaways
        fill(255, 255, 255);
        rect(this.x + this.width * 0.37, this.bottomY - this.height * 0.04, this.width * 0.08, this.height * 0.055);
        rect(this.x + this.width * 0.55, this.bottomY - this.height * 0.04, this.width * 0.08, this.height * 0.055);
        
        let centreRowY = this.y + this.height * 0.42;
        circle(this.x + this.width * 0.25, centreRowY, this.height * 0.25);
        circle(this.x + this.width * 0.75, centreRowY, this.height * 0.25);
        let smallRectW = this.width * 0.28;
        let smallRectH = this.height * 0.25;
        rect(this.x + this.width * 0.36, centreRowY - smallRectH * 0.5, smallRectW, smallRectH);

        // tape wheels
        fill(107, 145, 191);
        beginShape();
        shapeX = this.x + this.width * 0.36;
        shapeY = centreRowY - smallRectH * 0.5;
        vertex(shapeX, shapeY);
        shapeY += smallRectH;
        vertex(shapeX, shapeY);
        shapeX += smallRectW * 0.3;
        vertex(shapeX, shapeY);
        bezierVertex(shapeX + smallRectW * 0.05, shapeY - smallRectH * 0.4, shapeX + smallRectW * 0.05, shapeY - smallRectH * 0.6, shapeX, shapeY - smallRectH);
        endShape(CLOSE);

        beginShape();
        shapeX = this.x + this.width * 0.36 + smallRectW;
        shapeY = centreRowY - smallRectH * 0.5;
        vertex(shapeX, shapeY);
        shapeY += smallRectH;
        vertex(shapeX, shapeY);
        shapeX -= smallRectW * 0.3;
        vertex(shapeX, shapeY);
        bezierVertex(shapeX - smallRectW * 0.05, shapeY - smallRectH * 0.4, shapeX - smallRectW * 0.05, shapeY - smallRectH * 0.6, shapeX, shapeY - smallRectH);
        endShape(CLOSE);

        // wheel teeth
        this.offset += 0.1 * acceleration;
        this.drawWheelTeeth(this.x + this.width * 0.25, centreRowY, this.offset);
        this.drawWheelTeeth(this.x + this.width * 0.75, centreRowY, this.offset);
    }

    /**
     * originX and originY are the center point of the circle in which the teeth will be drawn
     * offset is between 0-1 and will spin the wheels
     */
    drawWheelTeeth(originX, originY, offset) {
        push();
        angleMode(DEGREES);
        rectMode(CENTER);
        let toothSize = this.height * 0.045;
        translate(originX, originY);
        rotate(60 * offset);
        for (let i = 0; i < 6; i++) {
            rotate(60);
            square(0, this.height * 0.1, toothSize, 1.2);
        }
        pop();
    }
}
