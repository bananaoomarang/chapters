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
  handleSave: function () {

    var payload = {
      title: 'Fairytale',
      text: 'Once upon a time...'
    };

    request
      .post('/story/upload')
      .send(payload)
      .set('Authorization', 'Bearer ' + this.props.token)
      .end(function (err, res) {
        if (err) return console.error(err);

        console.log('Save successful');
      });
  },

  render: function () {
    return (
      React.createElement("div", {className: "toolbar"}, 
        React.createElement(FontSize, {defaultSize: "24"}), 

        React.createElement("button", {className: "btn", name: "left"}, "Left"), 
        React.createElement("button", {className: "btn", name: "center"}, "Center"), 
        React.createElement("button", {className: "btn", name: "right"}, "Right"), 
        React.createElement("button", {className: "btn", name: "load"}, "Load"), 
        React.createElement("button", {className: "btn", name: "save", onClick: this.handleSave}, "Save")
      )
    );
  }
};

module.exports = React.createClass(Toolbar);
