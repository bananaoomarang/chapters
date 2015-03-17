'use strict';

var React = require('react');

var Paragraph = {
  getInitialState: function () {
    return { focused: false };
  },

  handleInput: function (e) {
  },

  handleFocus: function (event) {
    this.setState({ focused: true })
  },

  handleBlur: function (event) {
    this.setState({ focused: false })
  },

  render: function () {
    return (
      React.createElement("p", {type: "number", "data-index": this.props.index, onInput: this.handleInput, onBlur: this.props.onBlur, onFocus: this.props.onFocus, contentEditable: "true"})
    );
  }
};

module.exports = React.createClass(Paragraph);
