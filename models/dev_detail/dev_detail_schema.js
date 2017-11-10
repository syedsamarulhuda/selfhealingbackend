/**
 * Created by samar on 10/11/17.
 */


var mongoose = require('mongoose');

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

var devDetailSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        username: {

            type: String,
            required: true
        },
        password: {

            type: String,
            required: true
        },
        device_token: {

            type: String,
            required: true
        },
        role: {

            type: String,
            required: true
        },
        create_date: {

            type: Date,
            default: Date.now

        }

    });


var DevDetails = module.exports = mongoose.model('dev_details', devDetailSchema);