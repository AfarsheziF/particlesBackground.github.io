
Parse.initialize(
       "mePlZcG5fODbUvj19DGboB5iHCP7BVVOTz5C3R9z",
       "x32xV13HUSCJCS9kkt6uTm1zQPVn8RCVO9fzB5a7"
   );
Parse.serverURL = 'https://pg-app-1cltxnshjksg0clafdwxiw4ark8dvr.scalabl.cloud/1/';


var data;
var activeObject;

loadObject();

function loadObject(name) {
    var Article = Parse.Object.extend('Uncertainty');
    var query = new Parse.Query(Article);
    query.find().then(
        function (results) {
            data = results;
            setActiveObject(0);
            //console.log("Uncertainty data:", data);
            execute();
        }, function (error) {
            console.log(error);
        }
    );
}

function setActiveObject(pos) {
    activeObject = data[pos];
    globalVar.resolution = activeObject.get("resolution");
    //console.log("");
    //console.log("Active object", activeObject.get("name"));
    //console.log("Resolution", globalVar.resolution);
}


function sendEmail(subject, name, email, text) {

    Parse.Cloud.run("sendMail", {
        param1: subject,
        param2:
            "New messege sent from Joliba site! :) <br><br>" +
            "<b> Name: </b>" + name + "<br>" +
            "<b>Email: </b>" + email + "<br>" +
            "<b>Text: </b>" + text
    })
        .then(function (result) {
            console.log("result :" + JSON.stringify(result))
        }, function (error) {
            console.log("result :" + result);
        }
    );

}