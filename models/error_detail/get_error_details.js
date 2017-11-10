/**
 * Created by samar on 10/11/17.
 */

var ErrorDetails = require('./error_detail_schema');


module.exports.getErrorDetail = function (callback) {

    ErrorDetails.find(callback);
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