'use strict';

var React         = require('react');
var EditorActions = require('./actions/EditorActions');

var FontSize = React.createClass({

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
      <input type="number" value={this.state.value} onChange={this.handleChange} ></input>
    );

  }

});

var Toolbar = {
  render: function () {
    return (
      <div className="toolbar">
        <FontSize defaultSize="24" />

        <button className="btn" name="left">Left</button>
        <button className="btn" name="center">Center</button>
        <button className="btn" name="right">Right</button> 
        <button className="btn" name="load">Load</button> 
        <button className="btn" name="save">Save</button> 
      </div>
    );
  }
};

module.exports = React.createClass(Toolbar);
