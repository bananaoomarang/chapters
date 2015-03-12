'use strict';

var React         = require('react');
var please        = require('please-ajax')(window);
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
  handleSave: function () {
    var opts = {
      headers: {
        Authorization: 'Bearer ' + this.props.token
      },
      success: function (data) {
        console.log('Successfully saved!');
      },
      error: function (err) {
        console.error(err);
      }
    };

    var json = JSON.stringify({
      story: 'Once upon a time...'
    });

    please.post('/story/upload', json, opts)
  },

  render: function () {
    return (
      <div className="toolbar">
        <FontSize defaultSize="24" />

        <button className="btn" name="left">Left</button>
        <button className="btn" name="center">Center</button>
        <button className="btn" name="right">Right</button> 
        <button className="btn" name="load">Load</button> 
        <button className="btn" name="save" onClick={this.handleSave}>Save</button> 
      </div>
    );
  }
};

module.exports = React.createClass(Toolbar);
