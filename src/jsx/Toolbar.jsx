'use strict';

var React          = require('react');
var request        = require('superagent');
var EditorActions  = require('./actions/EditorActions');

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

});

var Toolbar = {
  handleAlignment: function (event) {
    EditorActions.setAlignment(event.target.name);
  },

  handleLoad: function () {
    EditorActions.setLoading(true);
  },

  render: function () {
    return (
      <div className="toolbar">
        <FontSize defaultSize="24" />

        <button className="btn" name="load"   onClick={this.handleLoad}      >Load</button> 
        <button className="btn" name="save"   onClick={this.props.handleSave}>Save</button> 

        <br />

        <button className="btn" name="left"   onClick={this.handleAlignment} >Left</button>
        <button className="btn" name="center" onClick={this.handleAlignment} >Center</button>
        <button className="btn" name="right"  onClick={this.handleAlignment} >Right</button>
      </div>
    );
  }
};

module.exports = React.createClass(Toolbar);
