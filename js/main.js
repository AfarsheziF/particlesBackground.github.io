
var sketch;
var sketchDiv;
var globalVar = new GlobalVar();
var skatchWidth;
var skatchHeight;
var windowWidth = window.innerWidth;
var windowHeight = window.innerHeight;
var skatchOnline = true;
var socket;
var patch;

function execute() {
    console.log("Execute Particles background");
    sketchDiv = document.getElementById("sketch-holder");
    connect();

    skatchWidth = windowWidth;
    skatchHeight = windowHeight;
    sketch = new p5(mySketch);

    //console.log("Div size", skatchWidth, skatchHeight);
    //console.log("Sketch size", sketch.width, sketch.height);
}

//listeners//

window.addEventListener('resize', function(event) {
    //windowWidth = window.innerWidth;
    //windowHeight = window.innerHeight;
    location.reload();
});

//Socket//
function connect() {
    if (skatchOnline) {
        //$.get("pb.pd",
        //    function(patchStr) {
        //        patch = Pd.loadPatch(patchStr);
        //        Pd.start();
        //        //console.log(patch);
        //});

        $.ajax({
            url: "../patches/pbOnline.pd",
            datatype: "json",
            type: 'get',
            error: function (xmlHttpRequest, textStatus, errorThrown) {
                console.log("Error loading PD patch");
                //console.log(xmlHttpRequest);
                //alert('status:' + XMLHttpRequest.status + ', status text: ' + XMLHttpRequest.statusText);
            },
            success: function(data) {
                patch = Pd.loadPatch(data);
                Pd.start();
                //patch = data;
                //console.log(data);
            }
        });

    } else {
        socket = io.connect('http://localhost:3000');
    }
}