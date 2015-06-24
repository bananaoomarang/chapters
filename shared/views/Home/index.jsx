'use strict';

import React       from 'react';
import { Link }    from 'react-router';
import Carousel    from './Carousel';
import MagicState  from 'alt/mixins/ReactStateMagicMixin';
import HomeStore   from '../../stores/HomeStore';
import HomeActions from '../../actions/HomeActions';

var Home = {
  displayName: 'Home',

  mixins: [MagicState],

  statics: {
    registerStore: HomeStore
  },

  componentDidMount: function () {
    HomeActions.loadStories();
  },

  render: function () {
    return (
      <div id="home">
        <link rel="stylesheet" type="text/css" href="//cdn.jsdelivr.net/jquery.slick/1.3.15/slick.css" />

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
