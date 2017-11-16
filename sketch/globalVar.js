
function GlobalVar(_p5) {

    this.p5 = _p5;

    this.particleForce = -2;
    this.particleRadius = 7;
    this.particleJitter = 0.01;
    this.particleForceManupulation = 0.5;
    this.particleForceMinimum = 0.000000000001;

    this.showParticles = false;
    this.particleStroke = 0.1;
    this.linesStroke = 0.2;
    this.displayLines = false;

    this.move = true;
    this.thisMouseX;
    this.thisMouseY;
    this.onHover = false;

    this.opacity = 7;
    this.linesLenght = 40;
    this.backgroundColor = 0;
    this.particalColor = 255;

    this.endSkatch = false;

    this.historySize = 50;
    this.historyColor = 170;
}