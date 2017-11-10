var admin = require("firebase-admin");
//var sendResponse = require('./sendResponse');

var serviceAccount = require("./self-healing-app-firebase-adminsdk.json");


admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://node-pn.firebaseio.com"
});


exports.sendFirebasePN = function (payload,deviceToken,option,callback) {


    sendPN(payload, option,deviceToken, callback);


};

function sendPN(payload, option,deviceToken, cb) {

    admin.messaging().sendToDevice(deviceToken, payload, option).then(
        function (response) {
            console.log("Successfully sent!", response);


            if (response.failureCount == 1) {
             //   cb(0);
            }
            else {
              //  cb(1);
            }

        })
        .catch(function (error) {

            console.log("Error sending message:", error);
           // cb(0);

        });




}



