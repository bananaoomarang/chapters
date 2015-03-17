'use strict';

var React          = require('react');
var request        = require('superagent');
var EditorActions  = require('./actions/EditorActions');

var FontSize = React.createClass({displayName: "FontSize",

  getInitialState: function () {
    return {
      value: this.props.defaultSize
    }
  },

  componentDidMount: function () {
    var font = {
      size: this.state.value
    };

    EditorActions.setFont(font);

    EditorActions.populateStories();
  },

  handleChange: function (event) {
    var font = {
      size: event.target.value
    };

    EditorActions.setFont(font);

    this.setState({
      value: event.target.value
    });
  },

  render: function () {

    return (
      React.createElement("input", {type: "number", value: this.state.value, onChange: this.handleChange})
    );

  }

});

var Toolbar = {
  handleAlignment: function (event) {
    EditorActions.setAlignment(event.target.name);
  },

  handleLoad: function () {
    EditorActions.setLoading(true);
  },

  render: function () {
    return (
      React.createElement("div", {className: "toolbar"}, 
        React.createElement(FontSize, {defaultSize: "24"}), 

        React.createElement("button", {className: "btn", name: "load", onClick: this.handleLoad}, "Load"), 
        React.createElement("button", {className: "btn", name: "save", onClick: this.props.handleSave}, "Save"), 

        React.createElement("br", null), 

        React.createElement("button", {className: "btn", name: "left", onClick: this.handleAlignment}, "Left"), 
        React.createElement("button", {className: "btn", name: "center", onClick: this.handleAlignment}, "Center"), 
        React.createElement("button", {className: "btn", name: "right", onClick: this.handleAlignment}, "Right")
      )
    );
  }
};

module.exports = React.createClass(Toolbar);
