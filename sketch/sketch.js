
//var mousePressed = false;

var mySketch = function (p) {

    p.physics;
    p.system
    p.rectAlpha = 255;

    //-----SETUP-----//
    p.setup = function () {
        p.createCanvas(skatchWidth, skatchHeight, "WEBGL").parent('sketch-holder');

        p.physics = new VerletPhysics2D();
        p.physics.setDrag(0.05);
        p.physics.setWorldBounds(p.rect(0, 0, p.width, p.height));

        p.system = new System(p);
        //p.backgroundColor = new BackgroundColor(p);
    }

    //-----DRAW-----//
    p.draw = function () {
        if (p.rectAlpha > 5) {
            p.rectAlpha--;
        }

        p.fill(globalVar.backgroundColor, globalVar.opacity);
        p.noStroke();
        p.rect(0, 0, p.width, p.height);

        p.physics.update();

        p.system.run();

        //p.fill(0, 102, 153);
        //p.text(p.frameRate(), 10, 60);
    }

    p.keyPressed = function () {
        switch (p.keyCode) {
            case 32:
                p.system.printSystem();
                break;
        }
    }

    p.mousePressed = function () {
   
    }

    p.mouseReleased = function () {
   
    }

    p.mouseDragged = function() {

    }
};
