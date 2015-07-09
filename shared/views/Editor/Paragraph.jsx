import React               from 'react';
import { PureRenderMixin } from 'react/addons';

var Paragraph = {
  mixins: [PureRenderMixin],

  getInitialState () {
    return { focused: false };
  },

  handleFocus () {
    this.setState({ focused: true });
  },

  handleBlur () {
    this.setState({ focused: false });
  },

  render () {
    return (
      <p type="number" data-index={this.props.index} onInput={this.handleInput} onBlur={this.props.onBlur} onFocus={this.props.onFocus} contentEditable="true">{this.props.text}</p>
    );
  }
};

module.exports = React.createClass(Paragraph);
