class Cassette {

    height = 200;
    width = this.height * 1.6;
    padding = this.height * 0.06;
    cornerCircleSize = this.height * 0.04;
    strokeWeight = this.height * 0.02;
    offset = 0;

    handwritingFont = "Caveat-VariableFont_wght";
    boldFont = "BowlbyOneSC-Regular";
    mainPrintFont = "Verdana";
    labelName = "Bowls";

    constructor(x, y) {
        this.setCassettePosition(x, y);
    }

    setCassettePosition(x, y) {
        this.x = x - this.width / 2;
        this.y = y - this.height / 2;
        this.rightX = this.x + this.width - this.padding;
        this.leftX = this.x + this.padding;
        this.topY = this.y + this.padding;
        this.bottomY = this.y + this.height - this.padding;
    }

    draw(acceleration) {
        // stroke weight calibrated to 4 for height of 200 - may adjust this later
        strokeWeight(this.strokeWeight);

        // main body
        fill(222, 81, 20);
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
        
        circle(this.leftX + this.width * 0.25, this.bottomY - this.height * 0.015, this.cornerCircleSize);
        circle(this.rightX - this.width * 0.25, this.bottomY - this.height * 0.015, this.cornerCircleSize);
        circle(this.x + this.width * 0.5, this.bottomY - this.height * 0.09, this.cornerCircleSize);

        // middle section
        fill(255, 255, 255);
        beginShape();
        shapeX = this.x + this.width * 0.05;
        shapeY = this.y + this.height * 0.7;
        vertex(shapeX, shapeY);
        shapeY -= this.height * 0.54;
        vertex(shapeX, shapeY);
        shapeX += this.width * 0.05;
        shapeY -= this.height * 0.08;
        vertex(shapeX, shapeY);
        shapeX = this.x + this.width * 0.9;
        vertex(shapeX, shapeY);
        shapeX += this.width * 0.05;
        shapeY += this.height * 0.08;
        vertex(shapeX, shapeY);
        shapeY += this.height * 0.54;
        vertex(shapeX, shapeY);
        endShape(CLOSE);

        push();
        fill(240, 195, 72);
        noStroke();
        rect(this.x + this.width * 0.05 + this.strokeWeight * 0.5, this.y + this.height * 0.3, this.width * 0.9 - this.strokeWeight, this.height * 0.4 - this.strokeWeight * 0.5);
        pop();
        push();
        // don't think I like this line but leaving it in for comparison
        //line(this.x + this.width * 0.05, this.y + this.height * 0.3, this.x + this.width * 0.95, this.y + this.height * 0.3);
        fill(0, 0, 0);
        textFont(this.mainPrintFont, this.height * 0.13);
        text("A", this.x + this.width * 0.12, this.y + this.height * 0.24);
        textFont(this.mainPrintFont, this.height * 0.07);
        text("C-60", this.x + this.width * 0.82, this.y + this.height * 0.65);
        textFont(this.boldFont, this.height * 0.07);
        text("HQ", this.x + this.width * 0.08, this.y + this.height * 0.65);
        stroke(0, 0, 0);
        strokeWeight(this.strokeWeight * 0.5);
        line(this.x + this.width * 0.25, this.y + this.height * 0.15, this.x + this.width * 0.85, this.y + this.height * 0.15);
        line(this.x + this.width * 0.25, this.y + this.height * 0.23, this.x + this.width * 0.85, this.y + this.height * 0.23);
        noStroke();
        fill(45, 50, 170);
        textFont(this.handwritingFont, this.height * 0.125);
        text(this.labelName + " Mix", this.x + this.width * 0.4, this.y + this.height * 0.22);
        pop();

        // cutaways
        fill(255, 255, 255);
        rect(this.x + this.width * 0.37, this.bottomY - this.height * 0.04, this.width * 0.08, this.height * 0.055);
        rect(this.x + this.width * 0.55, this.bottomY - this.height * 0.04, this.width * 0.08, this.height * 0.055);
        
        let centreRowY = this.y + this.height * 0.5;
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
        this.offset = JrUtils.constrainLoop(this.offset, 0, 1);
        this.drawWheelTeeth(this.x + this.width * 0.25, centreRowY);
        this.drawWheelTeeth(this.x + this.width * 0.75, centreRowY);
    }

    /**
     * originX and originY are the center point of the circle in which the teeth will be drawn
     * offset is between 0-1 and will spin the wheels
     */
    drawWheelTeeth(originX, originY) {
        push();
        angleMode(DEGREES);
        rectMode(CENTER);
        let toothSize = this.height * 0.045;
        translate(originX, originY);
        rotate(60 * this.offset);
        for (let i = 0; i < 6; i++) {
            rotate(60);
            square(0, this.height * 0.1, toothSize, 1.2);
        }
        pop();
    }
}
