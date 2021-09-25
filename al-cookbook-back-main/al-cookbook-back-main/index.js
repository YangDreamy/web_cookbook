// const express = require('express');
// const mysql = require('mysql');
require('dotenv').config();
const express = require('express');
const Router = require('./routes/api');
const dbConnection = require('./middlewares/mysql');
// const path = require('path');
const bodyParser = require('body-parser');
const app = express();
dbConnection.connect();
var allowCrossDomain = function (req, res, next){
    res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
};
app.use(allowCrossDomain);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use('/', Router);



app.get('/', function(req, res) {
    res.send('It works !');
});

app.use((req, res, next) => {
    const error = new Error('Not Found !');
    error.status = 404;
    next(error);
});

app.listen(process.env.BACKEND_PORT, function() {
    console.log('Server running on localhost:' + process.env.BACKEND_PORT);
});