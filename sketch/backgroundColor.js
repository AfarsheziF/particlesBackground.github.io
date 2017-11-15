
function BackgroundColor(_p5) {

    this.p5 = _p5;

    this.arrayPos = 0;
    this.onTransition = false;
    this.firstOp = 20;
    this.secoundOp = 0;

    this.backroundColorArray = [];
    console.log(ToxiclibsSupport);
    //this.backroundColorArray.push(TColor.newRandom());
    this.backroundColorArray.push(this.p5.color("#7f3b3b"));
    this.backroundColorArray.push(this.p5.color("#171d4f"));
    this.backroundColorArray.push(this.p5.color("#ffffff"));

    this.vertical = 4000;
    this.time = this.p5.millis() + this.vertical;

    this.run = function() {
        if (this.p5.millis() > this.time) {
            this.time = this.p5.millis() + this.vertical;
            this.arrayPos++;

            if (this.arrayPos > this.backroundColorArray.length - 1) {
                this.arrayPos = 0;
            }

            this.onTransition = true;
            console.log("Backround pos:",this.arrayPos);
        }

        //var c1 = this.backroundColorArray[0];
        //console.log(c1);
        //this.p5.fill(c1.red(), c1.green(), c1.blue());
        //this.p5.noStroke();
        //this.p5.rect(0, 0, this.p5.width, this.p5.height);

        if (this.onTransition) {

            //var secoundPos = this.arrayPos + 1;
            //if (secoundPos == this.backroundColorArray.length) {
            //    secoundPos = 0;
            //}

            //this.p5.fill(this.backroundColorArray[1], 0.05);
            //this.p5.noStroke();
            ////this.p5.strokeWeight(5);
            //this.p5.rect(0, 0, this.p5.width-200, this.p5.height-200);

            //console.log(this.secoundOp);
        }
    }

}