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

module.exports.updateErrorIsResolved = function (errorId, isResolved, callback) {

    var query = {error_id: errorId};

    var update = {
        isResolved: isResolved
    }

    ErrorDetails.updateOne(query, update, callback);

}