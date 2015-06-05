'use strict';

var React    = require('react');
var Link     = require('react-router').Link;
var Carousel = require('./Carousel');

var Home = {
  displayName: 'Home',

  render: function () {
    return (
      <div id="home">
        <Carousel />

        <hr />

        <Link to="login">Login</Link>
        <br />
        <Link to="register">Register</Link>
      </div>
    );
  }

};

module.exports = React.createClass(Home);
