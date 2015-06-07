'use strict';

var React       = require('react');
var Link        = require('react-router').Link;
var Carousel    = require('./Carousel');
var HomeStore   = require('../../stores/HomeStore');
var HomeActions = require('../../actions/HomeActions')

var Home = {
  displayName: 'Home',

  getInitialState: function () {
    return {
      stories: HomeStore.getStories()
    };
  },

  onHomeChange: function () {
    this.setState({
      stories: HomeStore.getStories()
    });
  },

  componentDidMount: function () {
    HomeStore.addChangeListener(this.onHomeChange);

    HomeActions.loadStories();
  },

  render: function () {
    return (
      <div id="home">
        <Carousel stories={this.state.stories} />

        <hr />

        <Link to="login">Login</Link>
        <br />
        <Link to="register">Register</Link>
      </div>
    );
  }

};

module.exports = React.createClass(Home);
