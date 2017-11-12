/**
 * Created by samar on 10/11/17.
 */

var express = require('express');
var uniqueId = require('uniqid');
var router = express.Router();
var sendResponse = require('./sendResponse');
var AppDetails = require('../models/app_detail/get_app_details');
var ErrorDetails = require('../models/error_detail/get_error_details');
var FirebasePn = require('../models/firebase/firebase_send_pn');
var DevDetails = require('../models/dev_detail/get_dev_detail')


router.get('/api/self_healing_app_details/', function (req, res) {

    AppDetails.getAppDetail(function (err, appDetails) {
        if (err) {
            sendResponse.sendErrorData(err, 'Err', res)

        } else {
            sendResponse.sendSuccessData(appDetails, res);
        }
    })

});


router.post('/api/register_app_detail/', function (req, res) {

    var appUniqueId = uniqueId();
    var app_detail = req.body;

    app_detail["app_id"] = appUniqueId;

    var deviceToken = app_detail.device_token;

    AppDetails.getAppDetailByToken(deviceToken, function (err, appDetail) {

        if (appDetail.length == 0) {
            AppDetails.addAppDetail(app_detail, function (err, app_detail) {
                if (err) {
                    sendResponse.sendErrorMessageAndStatus(err, GENERAL_ERROR_STATUS, res);
                } else {
                    sendResponse.sendSuccessData(app_detail, res);
                }

            })

        } else {

            sendResponse.sendErrorMessageAndStatus("App With This Device Token Already Exists!", GENERAL_ERROR_STATUS, res);

        }


    })


});


router.post('/api/catch_error/', function (req, res) {

    var error_details = req.body;
    var apiName = error_details.api_name;
    var apiId = error_details.api_id;
    var errorCode = error_details.error_code;
    var isResolved = error_details.isResolved ? "true" : "false";

    var deviceToken = error_details.device_token;
    var errorId = error_details.error_id;

    ErrorDetails.getErrorDetailByTokenAndErrorId(deviceToken, errorId, function (err, error_detail) {

        if (error_detail.length == 0) {

            error_details["isResolved"] = false;

            ErrorDetails.addErrorDetail(error_details, function (err, errorDetail) {
                if (err) {
                    sendResponse.sendErrorMessageAndStatus(err, GENERAL_ERROR_STATUS, res);
                } else {
                    sendResponse.sendSuccessData(errorDetail, res);
                    sendErrorPnToDev(errorId, apiName, apiId, errorCode, isResolved);

                }

            })

        } else {

            sendResponse.sendErrorMessageAndStatus("Error Already Registered!", GENERAL_ERROR_STATUS, res);

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


router.put('/api/error_resolved/:api_id/:error_code/:isResolved', function (req, res) {

    var reqBody = req.body;
    var apiId = req.params.api_id;
    var errorCode = req.params.error_code;
    var isResolved = req.params.isResolved;


    ErrorDetails.updateErrorIsResolved(apiId, errorCode, isResolved, reqBody.isResolved, function (err, userDetail) {
        if (err) {
            sendResponse.sendErrorMessageAndStatus(err, GENERAL_ERROR_STATUS, res);
        } else {
            sendResponse.sendSuccessData(userDetail, res);
            sendErrorResolvedPnToUser(apiId, errorCode, reqBody.isResolved);
        }

    })

});


router.post('/api/dev_sign_up/', function (req, res) {

    var dev_detail = req.body;
    DevDetails.devSignUp(dev_detail, function (err, error_detail) {
        if (err) {
            sendResponse.sendErrorMessageAndStatus(err, GENERAL_ERROR_STATUS, res);
        } else {
            sendResponse.sendSuccessData(error_detail, res);

        }

    })


});


router.post('/api/dev_login/', function (req, res) {

    var dev_detail = req.body;

    var username = dev_detail.username;
    var password = dev_detail.password;


    DevDetails.devLogin(username, password, function (err, dev_detail) {
        if (err) {
            sendResponse.sendErrorMessageAndStatus(err, GENERAL_ERROR_STATUS, res);
        } else {
            sendResponse.sendSuccessData(dev_detail, res);

        }

    })


});


router.get('/api/get_error/:errorId', function (req, res) {

    var errorId = req.params.errorId;

    ErrorDetails.getErrorDetailById(errorId, function (err, appDetails) {
        if (err) {
            throw err;

        }
        sendResponse.sendSuccessData(appDetails, res);
    })

});


router.get('/api/get_error/:api_id/:error_code/:isResolved', function (req, res) {

    var apiId = req.params.api_id;
    var errorCode = req.params.error_code;
    var isResolved = req.params.isResolved;

    var errorAndAppDetail;


    ErrorDetails.getErrorDetailAndAppDetails(apiId, errorCode, isResolved, function (err, errorDetails) {
        if (err) {
            throw err;
        }


        /*for (var i = 0; i < errorDetails.length; i++) {

            console.log("ERROR-TOKEN - " + errorDetails[i].device_token);

            AppDetails.getAppDetailByToken(errorDetails[i].device_token, function (err, appDetail) {

                if (err) {
                    throw err;
                }
                console.log("ERROR-DEVICE- " + appDetail[0].device_model);


                /!* errorAndAppDetail = {
                    app_name: appDetail[0].app_name,
                    app_version: appDetail[0].app_version,
                    device_model: appDetail[0].device_model,
                    os_version: appDetail[0].os_version,
                    platform: appDetail[0].platform
                };
*!/

            })


        }*/
        sendResponse.sendSuccessData(errorDetails, res);
    })

});

function sendErrorResolvedPnToUser(apiId, errorCode, isResolved) {

    // var deviceToken = token;

    var payload = {
        data: {
            errorId: "123",
            title: "Error Resolved!",
            body: "Please Click  "
        }
    };

    var option = {
        priority: "high",
        timeToLive: 60 * 60 * 24
    };

    ErrorDetails.getErrorDetailSegregate(apiId, errorCode, isResolved, function (err, errorDetails) {
        if (err) {
            throw err;

        }

        for (var i = 0; i < errorDetails.length; i++) {
            var deviceToken = errorDetails[i].device_token;

            console.log("USER TOKEN - " + deviceToken);

            FirebasePn.sendFirebasePN(payload, deviceToken, option);
        }


    });

}


function sendErrorPnToDev(errorId, apiName, apiId, errorCode, isResolved) {

    // var deviceToken = token;

    var payload = {
        data: {
            errorId: errorId,
            title: "Crash Report",
            body: "Api " + "\"" + apiName + "\"" + " has error",
            apiId: apiId.toString(),
            errorCode: errorCode.toString(),
            isResolved: isResolved

        }
    };

    var option = {
        priority: "high",
        timeToLive: 60 * 60 * 24
    };


    DevDetails.devList(function (err, devDetails) {
        if (err) {
            throw err;

        }

        for (var i = 0; i < devDetails.length; i++) {
            FirebasePn.sendFirebasePN(payload, devDetails[i].device_token, option);
        }
    })


}


module.exports = router;