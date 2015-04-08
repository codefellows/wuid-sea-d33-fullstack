'use strict';

var express = require('express');
var bodyparser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/notes_app');
var app = express();
app.use(bodyparser.json());

require('./routes/notes_routes')(app);

app.listen(3000, function() {
  console.log('server running');
});
