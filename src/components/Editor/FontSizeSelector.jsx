'use strict';

var React         = require('react');
var EditorActions = require('../actions/EditorActions');

var FontSizeSelector = {

  propTypes: {
    defaultSize: React.PropTypes.string
  },

  getInitialState: function () {
    return {
      value: this.props.defaultSize || 24
    };
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
      <input type="number" value={this.state.value} onChange={this.handleChange} ></input>
    );

  }

};

module.exports = React.createClass(FontSizeSelector);
