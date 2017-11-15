
function Particle(_p5, position, index, pRadius) {
    //VerletParticle2D.call(this, position);
    this.p5 = _p5;
    this.p = new VerletParticle2D(position);
    this.p5.physics.addParticle(this.p);
    this.history = [];

    //this.steer;
    //this.pos;
    //this.vel;
    this.index = index;
    this.color = globalVar.particalColor;
    this.lifeTime = this.p5.millis() + 4000;
    this.active = true;

    //Indevidual behavior//
    this.particleForce = globalVar.particleForce;
    this.particleJitter = globalVar.particleJitter;
    this.particleRadius = pRadius;

    this.attractionBehavior = new AttractionBehavior(this.p,
        pRadius,
        this.particleForce,
        this.particleJitter);

    this.p5.physics.addBehavior(this.attractionBehavior);

    //console.log("New particle", this.index);

    this.update = function () {

        if (this.p5.millis() > this.lifeTime) {
            this.active = false;
        }

        for (var i = this.history.length - 1; i >= 0; i--) {
            if (i >= globalVar.historySize) {
                this.history.slice(i);
            }
        }

        if (this.history.length > globalVar.historySize) {
            this.history.slice(0, 1);
        }

        this.history.push(new Vec2D(this.p.x, this.p.y));

        //this.attractionBehavior.setStrength(this.particleForce);
        //this.attractionBehavior.setJitter(this.particleForce);
        //this.attractionBehavior.setRadius(this.particleRadius);

        this.x = this.p.x;
        this.y = this.p.y;
    }

    this.display = function () {
        if (globalVar.showParticles) {
            this.p5.stroke(this.color);
            this.p5.strokeWeight(globalVar.particleStroke);
            this.p5.point(this.p.x, this.p.y);
        }

        for (var i = 1; i < this.history.length; i++) {
            if (i < this.history.length - 2) {
                var thisVec = this.history[i];
                var perVec = this.history[i - 1];
                this.p5.stroke(globalVar.historyColor);
                this.p5.strokeWeight(globalVar.particleStroke);
                this.p5.line(thisVec.x, thisVec.y, perVec.x, perVec.y);
            }
        }
    }

}

