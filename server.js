'use strict';
var PORT = parseInt(process.env.PORT, 10) || 3000;

var express = require('express');
var app = express(); 
var cors = require('cors');
app.use(cors()); // allow cross-origin requests

// CORS (Cross-Origin Resource Sharing) headers to support Cross-site HTTP requests
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

app.use(express.static(__dirname + '/www'));

app.listen(PORT);

console.log('server launched on port '+PORT);

