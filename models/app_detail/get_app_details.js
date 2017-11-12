/**
 * Created by samar on 10/11/17.
 */

var ApplicationDetails = require('./application_detail_schema');


module.exports.getAppDetail = function (callback) {

    ApplicationDetails.find(callback);
}

module.exports.getAppDetailByToken = function (token,callback) {

    var query = {device_token: token};
    ApplicationDetails.find(query,callback);
}


module.exports.getAppDetailToken = function (token) {
    var query = {device_token: token};
    return ApplicationDetails.find(query);
}

module.exports.addAppDetail = function (app_detail, callback) {
    ApplicationDetails.create(app_detail, callback);
}

