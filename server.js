
var express = require('express');
var app = express();
var server = app.listen(3000);

//app.use(express.static('public'));


//Sokect//

var sokect = require('socket.io');
var io = sokect(server);
io.sockets.on('connection', newConnection);

function newConnection(socket) {
    console.log("New connection:", socket.id);
    socket.on("playSystem", getData);
    socket.on("closeSystem", close);

    function getData(data) {
        //console.log(data);
        sendOSC("play", data);
    }

    function close() {
        sendOSC("stop", 0);
    }
}

//OSC//

var osc = require("osc");

var udpPort = new osc.UDPPort({
    localAddress: "0.0.0.0",
    localPort: 57121,
    metadata: true
});

udpPort.on("bundle", function (oscBundle, timeTag, info) {
    console.log("An OSC bundle just arrived for time tag", timeTag, ":", oscBundle);
    console.log("Remote info is: ", info);
});

udpPort.on("message", function (oscMessage) {
    console.log(oscMessage);
});

udpPort.open();

udpPort.on("ready", function () {
    sendOSC(10);
});

function sendOSC(target, value) {
    udpPort.send({
        address: "/system",
        args: [
            {
                type: "s",
                value: target
            },
            {
                type: "i",
                value: value
            }
        ]
    }, "192.168.0.5", 57110);
}



console.log("Server is runing");