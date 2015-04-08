'use strict';

var Note = require('../model/note');

module.exports = function(app) {
  app.get('/notes', function(req, res) {
    Note.find({}, function(err, data) {
      if (err) {
        console.log(err);
        return res.status(500).send({msg: 'internal server error'});
      }

      res.json(data);
    });
  });

  app.post('/notes', function(req, res) {
    var newNote = new Note(req.body);
    newNote.save(function(err, data) {
      if (err) {
        console.log(err);
        return res.status(500).send({msg: 'internal server error'});
      }

      res.json(data);
    });
  });

  app.put('/notes/:id', function(req, res) {
    var updatedNote = req.body;
    delete updatedNote._id;

    Note.findOneAndUpdate({_id: req.params.id}, updatedNote, function(err, data) {
      if (err) {
        console.log(err);
        return res.status(500).send({msg: 'internal server error'});
      }

      res.json(data); 
    });
  });

  app.delete('/notes/:id', function(req, res) {
    Note.remove({_id: req.params.id}, function(err) {
      if (err) {
        console.log(err);
        return res.status(500).send({msg: 'internal server error'});
      }

      res.json({msg: 'success!'});
    });
  });
};
