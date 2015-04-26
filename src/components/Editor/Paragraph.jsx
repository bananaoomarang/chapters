'use strict';

var React  = require('react');
var addons = require('react/addons').addons;

var Paragraph = {
  mixins: [addons.PureRenderMixin],

  getInitialState: function () {
    return { focused: false };
  },

  handleInput: function () {
  },

  handleFocus: function () {
    this.setState({ focused: true });
  },

  handleBlur: function () {
    this.setState({ focused: false });
  },

  render: function () {
    return (
      <p type="number" data-index={this.props.index} onInput={this.handleInput} onBlur={this.props.onBlur} onFocus={this.props.onFocus} contentEditable="true">{this.props.text}</p>
    );
  }
};

module.exports = React.createClass(Paragraph);
