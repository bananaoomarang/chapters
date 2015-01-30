var React = require('react');

var Paragraph = {
  getInitialState: function () {
    return { focused: false };
  },

  handleInput: function (event) {
  },

  handleFocus: function (event) {
    this.setState({ focused: true })
  },

  handleBlur: function (event) {
    this.setState({ focused: false })
  },

  componentDidMount: function () {
  },

  render: function () {
    return (
      <p type="number" data-index={this.props.index} onInput={this.handleInput} onBlur={this.props.onBlur} contentEditable="true" onChange={this.handleChange} onFocus={this.props.onFocus}></p>
    );
  }
};

module.exports = React.createClass(Paragraph);
