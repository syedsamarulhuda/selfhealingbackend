/**
 * Created by samar on 10/11/17.
 */

var ApplicationDetails = require('./application_detail_schema');


module.exports.getAppDetail = function (callback) {

    ApplicationDetails.find(callback);
}

module.exports.addAppDetail = function (app_detail, callback) {
    ApplicationDetails.create(app_detail, callback);
}

