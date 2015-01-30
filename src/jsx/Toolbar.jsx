var React = require('react');

var FontSize = React.createClass({
  getInitialState: function () {
    return { value: this.props.defaultSize };
  },
  handleChange: function (event) {
    this.setState({ value: event.target.value });
  },
  componentDidMount: function () {
  },
  render: function () {
    return (
      <input type="number" value={this.state.value} onChange={this.handleChange}></input>
    );
  }
});

var Toolbar = {
  render: function () {
    return (
      <div className="toolbar">
        <FontSize defaultSize="1" />

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
