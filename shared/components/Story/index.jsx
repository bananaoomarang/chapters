import React, { PropTypes } from 'react';
import { connect }          from 'react-redux';
import * as StoryActions    from 'actions/StoryActions';
import CardsView            from 'components/CardsView';

@connect(state => ({
  story: state.story.get('story')
}))

export default class Story extends React.Component {
  static propTypes = {
    routeParams: PropTypes.object.isRequired
  }

  static needs = [
    StoryActions.getStory
  ]

  render() {
    const sections = [
      {
        title: 'Lorem',
        body: 'Crazy good read',
        href: '/home'
      },
      {
        title: 'Lorem',
        body: 'Crazy good read',
        href: '/home'
      },
      {
        title: 'Lorem',
        body: 'Crazy good read',
        href: '/home'
      },
      {
        title: 'Lorem',
        body: 'Crazy good read',
        href: '/home'
      },
      {
        title: 'Lorem',
        body: 'Crazy good read',
        href: '/home'
      },
      {
        body: '+',
        href: '/stories/' + this.props.routeParams.id + '/new'
      }
    ];

    return (
      <div id="story">
        <h1>{this.props.story.get('title')}</h1>

        <h3>By: {this.props.story.get('author')}</h3>

        <CardsView items={sections} emptyMsg="No sections"/>
      </div>
    );
  }
}
