'use strict';

import React            from 'react';
import { Link }         from 'react-router';
import { connect }      from 'react-redux';
import * as HomeActions from 'actions/HomeActions';
import Carousel         from './Carousel';

@connect(state => ({
  home: state.home
}))

export default class Home extends React.Component {
  constructor(props) {
    super(props);

    HomeActions.getStories()(props.dispatch);
  }

  render() {
    return (
      <div id="home">
        <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.3.15/slick.css" />

        <Carousel stories={this.props.home.get('stories')} />

        <hr />

        <Link to="login">Login</Link>

        <br />

        <Link to="register">Register</Link>
      </div>
    );
  }

}
