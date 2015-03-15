'use strict';

var React          = require('react');
var request        = require('superagent');
var ToolbarActions = require('./actions/ToolbarActions');

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
      <input type="number" value={this.state.value} onChange={this.handleChange} ></input>
    );

  }

});

var Toolbar = {
  handleSave: function () {

  },

  render: function () {
    return (
      <div className="toolbar">
        <FontSize defaultSize="24" />

        <button className="btn" name="left">Left</button>
        <button className="btn" name="center">Center</button>
        <button className="btn" name="right">Right</button> 
        <button className="btn" name="load">Load</button> 
        <button className="btn" name="save" onClick={this.props.handleSave}>Save</button> 
      </div>
    );
  }
};

module.exports = React.createClass(Toolbar);
