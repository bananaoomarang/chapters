import React               from 'react';
import { PureRenderMixin } from 'react/addons';

var Paragraph = {
  mixins: [PureRenderMixin],

  getInitialState: function () {
    return { focused: false };
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
