/**
 * Created by samar on 10/11/17.
 */

var express = require('express');
var uniqueId = require('uniqid');
var router = express.Router();
var sendResponse = require('./sendResponse');
var AppDetails = require('../models/app_detail/get_app_details');
var ErrorDetails = require('../models/error_detail/get_error_details');
var FirebasePn= require('../models/firebase/firebase_send_pn')


router.get('/api/self_healing_app_details/', function (req, res) {

console.log('here -')
    AppDetails.getAppDetail(function (err, appDetails) {
        if (err) {
            sendResponse.sendErrorData(err,'Err',res)

        }else{
            sendResponse.sendSuccessData(appDetails, res);
        }
    })

});


router.post('/api/register_app_detail/', function (req, res) {

    var appUniqueId = uniqueId();
    var app_detail = req.body;

    app_detail["app_id"]=appUniqueId;


    AppDetails.addAppDetail(app_detail, function (err, app_detail) {
        if (err) {
            sendResponse.sendErrorMessageAndStatus(err, GENERAL_ERROR_STATUS, res);
        } else {
            sendResponse.sendSuccessData(app_detail, res);
        }

    })


});


router.post('/api/catch_error/', function (req, res) {

    var error_detail = req.body;

    error_detail["isResolved"]=false;


    ErrorDetails.addErrorDetail(error_detail, function (err, error_detail) {
        if (err) {
            sendResponse.sendErrorMessageAndStatus(err, GENERAL_ERROR_STATUS, res);
        } else {
            sendResponse.sendSuccessData(error_detail, res);
            sendErrorPn(error_detail.error_id,error_detail.device_token);

        }

    })


});


router.get('/api/get_error_list/', function (req, res) {


    ErrorDetails.getErrorDetail(function (err, appDetails) {
        if (err) {
            throw err;

        }
        sendResponse.sendSuccessData(appDetails, res);
    })

});



router.put('/api/error_resolved/:errorId', function (req, res) {

    var reqBody = req.body;
    var errorId = req.params.errorId;

    ErrorDetails.updateErrorIsResolved(errorId, reqBody.isResolved, function (err, userDetail) {
        if (err) {
            sendResponse.sendErrorMessageAndStatus(err, GENERAL_ERROR_STATUS, res);
        } else {
            sendResponse.sendSuccessData(userDetail, res);
        }

    })

});


function sendErrorPn(errorId,token) {

    var deviceToken = token;

    var payload = {
        data: {
            errorId: errorId,
            title: "Testing",
            body: "Testing 123"
        }
    };

    var option = {
        priority: "high",
        timeToLive: 60 * 60 * 24
    };

    FirebasePn.sendFirebasePN(payload,deviceToken,option);
}


module.exports = router;