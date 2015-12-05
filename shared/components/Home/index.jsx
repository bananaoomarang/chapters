import React, { PropTypes } from 'react';
import { connect }          from 'react-redux';
import { List }             from 'immutable';
import * as HomeActions     from 'actions/HomeActions';
import Carousel             from './Carousel';

@connect(state => ({
  stories: state.home.get('stories')
}))

export default class Home extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    stories:  PropTypes.instanceOf(List)
  }

  componentDidMount() {
    this.props.dispatch(
      HomeActions.getStories()
    );
  }

  render() {
    return (
      <div id="home">
        <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.3.15/slick.css" />

        <Carousel stories={this.props.stories} />

        <hr />
      </div>
    );
  }

}
