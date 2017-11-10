/**
 * Created by samar on 10/11/17.
 */


var mongoose = require('mongoose');

var dbConfig = config.get('MongoDatabaseSettings');

/*var mongoString = dbConfig.host + dbConfig.port + "/" + dbConfig.database;

console.log(mongoString);
 mongoose.connect(mongoString);*/

mongoose.connect('mongodb://'+dbConfig.username+':'+dbConfig.password+'@'+dbConfig.host+'/'+dbConfig.database, function (error) {

    if (error) {
        console.log(error);
    }
});

var db = mongoose.connection;

var appDetailSchema = mongoose.Schema(
    {
        app_id: {
            type: String,
            required: true
        },
        app_name: {
            type: String,
            required: true
        },
        app_version: {

            type: String,
            required: true
        },
        device_model: {

            type: String,
            required: true
        },
        os_version: {

            type: String,
            required: true
        },
        platform: {
            type: String,
            required: true
        },
        device_token: {

            type: String,
            required: true
        },
        create_date: {

            type: Date,
            default: Date.now

        }

    });


var ApplicationDetails = module.exports = mongoose.model('app_details', appDetailSchema);