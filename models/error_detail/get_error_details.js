/**
 * Created by samar on 10/11/17.
 */

var ErrorDetails = require('./error_detail_schema');


module.exports.getErrorDetail = function (callback) {

    //ErrorDetails.find(callback);
  /*  ErrorDetails.aggregate([{"$match":{"error_code":500}},{"$lookup":
    {
        from: "app_details",
        localField: "device_token",
        foreignField: "device_token",
        as: "app_details_info"
    }},{"$match":{"app_details_info.os_version":{"$ne":"N"}}}],callback);*/


    ErrorDetails.aggregate([{"$lookup":
    {
        from: "app_details",
        localField: "device_token",
        foreignField: "device_token",
        as: "app_details_info"
    }}],callback);
}


module.exports.getErrorDetailById = function (errorId, callback) {

    var query = {error_id: errorId};
    ErrorDetails.find(query, callback);
}


module.exports.getErrorDetailByTokenAndErrorId = function (token, errorId, callback) {

    var query = {error_id: errorId, device_token: token};
    ErrorDetails.find(query, callback);
}


module.exports.getErrorDetailSegregate = function (apiId, errorCode, isResolved, callback) {

    var query = {
        api_id: apiId,
        isResolved: isResolved,
        error_code: errorCode
    };
    ErrorDetails.find(query, callback);
}



module.exports.getErrorDetailAndAppDetails = function (apiId, errorCode, isResolved, callback) {

    ErrorDetails.aggregate([{
        "$lookup": {
            from: "app_details",
            localField: "device_token",
            foreignField: "device_token",
            as: "app_detail"
        }
    }], callback);


   /* var query = {
        api_id: apiId,
        isResolved: isResolved,
        error_code: errorCode
    };
    ErrorDetails.find(query, callback);*/
}



module.exports.addErrorDetail = function (app_detail, callback) {
    ErrorDetails.create(app_detail, callback);
}

module.exports.updateErrorIsResolved = function (apiId, errorCode, isResolvedCurrent, isResolved, callback) {

    var query = {api_id: apiId, error_code: errorCode, isResolved: isResolvedCurrent};

    var update = {
        isResolved: isResolved
    }

    ErrorDetails.updateMany(query, update, callback);

}