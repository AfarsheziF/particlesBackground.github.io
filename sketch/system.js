
var timer = 0;
var ranSet = false;
var interval = 5000;
var x;
var y;
var thisParticlesSize;
var playSystem = true;

function System(_p5) {

    this.p5 = _p5;
    this.particles = [];

    this.addParticle = function (x, y) {
        if (this.particles.length === thisParticlesSize) {
            //console.log("Clean system", thisParticlesSize, this.particles.length);
            this.cleanSystem();
        }
        thisParticlesSize = this.particles.length;
        var p = new Particle(this.p5, new Vec2D(x, y), this.particles.length, this.p5.random(globalVar.particleRadius - 2, globalVar.particleRadius));
        this.particles.push(p);
        //console.log("Add p", thisParticlesSize, this.particles.length);
    }

    this.removeParticle = function (p) {
        if (p != null) {
            //console.log("Remove particle", p.index);
            this.particles.splice(p.index, 1);
            this.p5.physics.behaviors.splice(p.index, 1);
            this.p5.physics.particles.splice(p.index, 1);
            if (this.particles.length <= 2) {
                this.particles = [];
            }
        }
    }

    this.printSystem = function () {
        console.log(
            "System print",
            "\nParticles:", this.particles.length,
            "\nPhysics particles:", this.p5.physics.particles.length,
            "\nPhysics behaviors:", this.p5.physics.behaviors.length);
    }

    this.playSystem = function () {
        var x = this.p5.random(this.p5.width);
        var y = this.p5.random(this.p5.height);
        //console.log("playSystem", x, y);
        for (var i = 0; i < 10; i++) {
            this.addParticle(x, y);
        }
    }

    this.cleanSystem = function () {
        this.particles = [];
        this.p5.physics.particles = [];
        this.p5.physics.behaviors = [];
    }

    this.run = function () {
        if (this.p5.mouseIsPressed) {
            this.addParticle(this.p5.mouseX, this.p5.mouseY);
        }

        var time = this.p5.millis();
        if (time > timer + interval) {
            interval = this.p5.random(3000, 5000);
            //interval = this.p5.random(1000, 1200);
            if (!ranSet) {
                x = this.p5.random(this.p5.width);
                y = this.p5.random(this.p5.height);
                ranSet = true;
            }

            this.addParticle(x, y);

            if (skatchOnline) {
                Pd.send('play', [x]);
            } else {
                socket.emit("playSystem", x);
            }

            if (time > timer + (interval * 2)) {
                timer = time;
                ranSet = false;

                if (playSystem) {
                    if (globalVar.particleRadius > 20) {
                        globalVar.particleJitter += 0.5;
                    } else {
                        globalVar.particleJitter += 0.01;
                        globalVar.particleRadius++;
                    }
                    //console.log("Radius:", globalVar.particleRadius, "Jitter:", globalVar.particleJitter);
                }

                if (skatchOnline) {
                    Pd.send('stop', [0]);
                } else {
                    socket.emit("closeSystem");
                }
            }
        }

        this.update();
    }

    this.update = function () {
        for (var i = this.particles.length - 1; i >= 0; i--) {
            var p1 = this.particles[i];
            if (p1 != null && p1.active) {
                p1.update();
                p1.display();

                if (globalVar.displayLines && i - 1 > 0) {
                    var p2 = this.particles[i - 1];
                    var dis = this.p5.dist(p1.x, p1.y, p2.x, p2.y);
                    //console.log(dis);
                    if (dis < globalVar.linesLenght) {
                        this.displayLine(p1, p2);
                    }
                }

            } else {
                this.removeParticle(p1);
            }
        }
    }

    this.displayLine = function (p1, p2) {
        this.p5.stroke(globalVar.particalColor);
        this.p5.strokeWeight(globalVar.linesStroke);
        this.p5.line(p1.x, p1.y, p2.x, p2.y);
    }

}
