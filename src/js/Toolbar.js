'use strict';

var React          = require('react');
var request        = require('superagent');
var ToolbarActions = require('./actions/ToolbarActions');

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

    ToolbarActions.setFont(font);
  },

  handleChange: function (event) {
    var font = {
      size: event.target.value
    };

    ToolbarActions.setFont(font);

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
    ToolbarActions.setAlignment(event.target.name);
  },

  render: function () {
    return (
      React.createElement("div", {className: "toolbar"}, 
        React.createElement(FontSize, {defaultSize: "24"}), 

        React.createElement("button", {className: "btn", name: "left", onClick: this.handleAlignment}, "Left"), 
        React.createElement("button", {className: "btn", name: "center", onClick: this.handleAlignment}, "Center"), 
        React.createElement("button", {className: "btn", name: "right", onClick: this.handleAlignment}, "Right"), 
        React.createElement("button", {className: "btn", name: "load", onClick: this.handleAlignement}, "Load"), 
        React.createElement("button", {className: "btn", name: "save", onClick: this.props.handleSave}, "Save")
      )
    );
  }
};

module.exports = React.createClass(Toolbar);
