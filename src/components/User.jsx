'use strict';

var React          = require('react');
var Link           = require('react-router').Link;

var User = {
  getInitialState: function () {
    return {};
  },

  onSessionChange: function () {
    this.setState({});
  },

  componentDidMount: function () {
    return;
  },

  render: function () {

    console.log(this.props.params);

    return (
      <div id="user">
        <h1>{this.props.params.user}</h1>
        <br />
        <Link to="user-stories" params={this.props.params}>Stories</Link>
      </div>
    );

  }
};

module.exports = React.createClass(User);
