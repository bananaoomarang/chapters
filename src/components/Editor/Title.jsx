'use strict';

var React         = require('react');
var EditorActions = require('../actions/EditorActions');

var EditorTitle = {
  handleInput: function () {
    var title = document.getElementById('title');

    EditorActions.setStory({
      title: title.innerText
    });

  },

  render: function () {

    return (
      <h1 id="title" contentEditable="true" onInput={this.handleInput}>{this.props.title}</h1>
    );
  }
};

module.exports = React.createClass(EditorTitle);
