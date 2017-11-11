/**
 * Created by samar on 10/11/17.
 */

var ErrorDetails = require('./error_detail_schema');


module.exports.getErrorDetail = function (callback) {

    ErrorDetails.find(callback);
}


module.exports.getErrorDetailById = function (errorId, callback) {

    var query = {error_id: errorId};
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


module.exports.addErrorDetail = function (app_detail, callback) {
    ErrorDetails.create(app_detail, callback);
}

module.exports.updateErrorIsResolved = function (apiId,errorCode,isResolvedCurrent, isResolved, callback) {

    var query = {api_id:apiId,error_code: errorCode,isResolved:isResolvedCurrent};


    console.log("MODEL"+apiId+"-"+errorCode+"-"+isResolvedCurrent);
    var update = {
        isResolved: isResolved
    }

    ErrorDetails.updateMany(query, update, callback);

}