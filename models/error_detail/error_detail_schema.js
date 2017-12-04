/**
 * Created by samar on 10/11/17.
 */


var mongoose = require('mongoose');


var Schema = mongoose.Schema;

var dbConfig = config.get('MongoDatabaseSettings');

/*var mongoString = dbConfig.host + dbConfig.port + "/" + dbConfig.database;

 console.log(mongoString);
 mongoose.connect(mongoString);*/

mongoose.createConnection('mongodb://' + dbConfig.username + ':' + dbConfig.password + '@' + dbConfig.host + '/' + dbConfig.database, function (error) {

    if (error) {
        console.log(error);
    }
});

var db = mongoose.connection;

var errorDetailSchema = Schema(
    {
        error_id: {
            type: String,
            required: true
        },
        device_token: {

            type: String,
            required: true
        },
        api_id: {
            type: Number,
            required: true
        },
        api_name: {

            type: String,
            required: true
        },
        request_param: {

            type: String,
            required: true
        },
        error_code: {

            type: Number,
            required: true
        },
        connection_type: {

            type: String,
            required: true
        },
        isResolved: {

            type: Boolean,
            required: true
        },
        create_date: {

            type: Date,
            default: Date.now

        }

    });


var ErrorDetails = module.exports = mongoose.model('error_details', errorDetailSchema);