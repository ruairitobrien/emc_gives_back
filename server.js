'use strict';
var PORT = parseInt(process.env.PORT,10) || 3000;

var express = require('express');
var app = express(); 
var cors = require('cors');
app.use(cors()); // allow cross-origin requests
 
app.use(express.static(__dirname + '/www'));

app.listen(PORT);
