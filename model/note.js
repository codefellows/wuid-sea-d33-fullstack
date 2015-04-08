'use strict';

var mongoose = require('mongoose');

var NoteSchema = new mongoose.Schema({
  noteBody: String
});

module.exports = mongoose.model('User', NoteSchema);
