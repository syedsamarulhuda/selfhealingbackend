/**
 * Created by samar on 19/11/17.
 */

var FCM = require('fcm-node');
var serverKey = 'AAAAs9dlODA:APA91bHMLh4neI5WMKlUQevA4kCN0XIyszHwKC8H9bIIT0B5T8BRjhkztAMnTKHHTLybio60Kh_UmAGYVLtpBNnrgXz8FV161NC5riZAoPrHON4UReKQiyxLgAsU14v1rcGeZpeSQv1'; //put your server key here
var fcm = new FCM(serverKey);


exports.sendFirebasePN = function (payload,deviceToken,option,callback) {


    sendPN(payload, option,deviceToken, callback);


};

function sendPN(payload, option,deviceToken, cb) {
    var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
        to: 'registration_token',
        collapse_key: 'your_collapse_key',

        notification: {
            title: 'Title of your push notification',
            body: 'Body of your push notification'
        },

        data: {  //you can send only notification or only data(or include both)
            my_key: 'my value',
            my_another_key: 'my another value'
        }
    };

    fcm.send(message, function (err, response) {
        if (err) {
            console.log("Something has gone wrong!");
        } else {
            console.log("Successfully sent with response: ", response);
        }
    });
}
