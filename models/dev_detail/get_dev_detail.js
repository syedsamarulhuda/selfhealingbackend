/**
 * Created by samar on 10/11/17.
 */

var DevDetails = require('./dev_detail_schema');


module.exports.devLogin = function (username, password, callback) {

    var query = {username: username, password: password};

    DevDetails.find(query, callback);
}

module.exports.devSignUp = function (dev_detail, callback) {
    DevDetails.create(dev_detail, callback);
}


module.exports.devList = function (callback) {

    DevDetails.find(callback);
}
