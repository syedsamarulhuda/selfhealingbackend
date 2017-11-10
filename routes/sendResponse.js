


exports.parameterMissingError = function (res) {

    var errResponse = {
        status: constants.responseStatus.PARAMETER_MISSING,
        message: constants.responseMessage.PARAMETER_MISSING,
        is_error: true,
        data: {}
    }
    sendData(errResponse,res);
};
exports.somethingWentWrongError = function (res) {

    var errResponse = {
        status: constants.responseStatus.SHOW_ERROR_MESSAGE,
        message: constants.responseMessage.SHOW_ERROR_MESSAGE,
        is_error: true,
        data: {}
    }
    sendData(errResponse,res);
};

exports.sendSuccessData = function (data,res) {

    var successResponse = {
        status: constants.responseStatus.SHOW_DATA,
        message: "",
        is_error: false,
        data: data
    };
    sendData(successResponse,res);
};
exports.sendErrorData = function (data,msg,res) {

    var successResponse = {
        status: constants.responseStatus.SHOW_ERROR_MESSAGE,
        message: msg,
        is_error: true,
        data: data
    };
    sendData(successResponse,res);
};
exports.sendSuccessDataWithStatus = function (data,status,res) {

    var successResponse = {
        status: status,
        message: "",
        is_error: false,
        data: data
    };
    sendData(successResponse,res);
};
exports.sendSuccessDataWithMessage = function (data,msg,res) {

    var successResponse = {
        status: constants.responseStatus.SHOW_DATA,
        message: msg,
        is_error: false,
        data: data
    };
    sendData(successResponse,res);
};
exports.sendErrorMessage = function (msg,res) {
    var errResponse = {
        status: constants.responseStatus.SHOW_ERROR_MESSAGE,
        message: msg,
        is_error: true,
        data: {}
    };
    sendData(errResponse,res);
};
exports.sendErrorMessageAndStatus = function (msg,status,res) {
    var errResponse = {
        status: status,
        message: msg,
        is_error: true,
        data: {}
    };
    sendData(errResponse,res);
};
exports.sendMsgWithStatusCode=function(statusCode,msg,res){
    var errResponse = {
        status: statusCode,
        message: msg,
        is_error: false,
        data: {}
    };
    sendData(errResponse,res);
}
function sendData(data,res)
{
    res.type('json');
    res.jsonp(data);
}