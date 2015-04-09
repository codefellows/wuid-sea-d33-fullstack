'use strict';

var React = require('react');
var request = require('superagent');

var NoteForm = React.createClass({
  getInitialState: function() {
    return {newNote: {noteBody: ''}};
  },
  handleChange: function(event) {
    var stateCopy = this.state;
    stateCopy.newNote.noteBody = event.target.value;
    this.setState(stateCopy);
  },
  handleSubmit: function(event) {
    event.preventDefault();

    this.props.submitFunc(this.state.newNote);
    this.setState({newNote: {noteBody: ''}});
  },
  render: function() {
    return (
      <form name="newnoteform" onSubmit={this.handleSubmit}>
        <label hmtlFor="newnotebody">New Note:</label>
        <input type="text" onChange={this.handleChange} name="newnotebody" value={this.state.newNote.noteBody} />
        <button type="submit">Create New Note</button>
      </form>
    )
  }
});

var Note = React.createClass({
  render: function() {
    return <li>{this.props.data.noteBody}</li>;
  }
});

var NotesList = React.createClass({
  render: function() {
    var notes = this.props.data.map(function(note) {
      return <Note data={note} key={note._id} />
    });

    return (
      <ul>{notes}</ul>
    );
  }
});

var NotesApp = React.createClass({
  getInitialState: function() {
    return {notes: []};
  },
  componentDidMount: function() {
    request
      .get('/notes')
      .end(function(err, res) {
        if (err) return console.log(err);
        this.setState({notes: res.body});
      }.bind(this));
  },
  submitNewNote: function(note) {
    request
      .post('/notes')
      .send(note)
      .end(function(err, res) {
        var stateCopy = this.state;
        stateCopy.notes.push(res.body);
        this.setState(stateCopy);
      }.bind(this));
  },
  render: function() {
    return (
      <main>
        <h1>Notes App</h1>
        <NoteForm submitFunc={this.submitNewNote}/>
        <NotesList data={this.state.notes} />
      </main>
    )
  }
});

React.render(<NotesApp />, document.body);
