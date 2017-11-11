/**
 * Created by samar on 10/11/17.
 */

//process.env.NODE_ENV = 'dbConfigDevelopment';
process.env.NODE_ENV = 'development';


var express = require('express');
var app = express();
config = require('config');
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.set('json spaces', 1);
var push = require('./routes/push');
constants = require('./routes/constant');


app.get('/api/self_healing_app_details/', push);

app.post('/api/register_app_detail/', push);

app.post('/api/catch_error/', push);

app.get('/api/get_error_list/', push);

app.get('/api/get_error/:errorId', push);

app.get('/api/get_error/:api_id/:error_code/:isResolved', push);

app.put('/api/error_resolved/:api_id/:error_code/:isResolved',push);

app.post('/api/dev_sign_up/', push);

app.post('/api/dev_login/', push);

app.get('/api/dev_list/',push);


app.listen(8000, '0.0.0.0', function () {
    console.log('Listening to port:  ' + 8000);
});