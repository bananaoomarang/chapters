'use strict';

var React         = require('react');
var EditorActions = require('./actions/EditorActions');

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
  render: function () {
    return (
      React.createElement("div", {className: "toolbar"}, 
        React.createElement(FontSize, {defaultSize: "24"}), 

        React.createElement("button", {className: "btn", name: "left"}, "Left"), 
        React.createElement("button", {className: "btn", name: "center"}, "Center"), 
        React.createElement("button", {className: "btn", name: "right"}, "Right"), 
        React.createElement("button", {className: "btn", name: "load"}, "Load"), 
        React.createElement("button", {className: "btn", name: "save"}, "Save")
      )
    );
  }
};

module.exports = React.createClass(Toolbar);
