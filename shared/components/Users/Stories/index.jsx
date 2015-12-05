import React, { PropTypes } from 'react';
import { connect }          from 'react-redux';
import * as StoryActions    from 'actions/StoryActions';
import CardsView            from 'components/CardsView';
import { List }             from 'immutable';

@connect(state => ({
  stories: state.story.get('userStories')
}))

export default class Stories {
  static propTypes = {
    dispatch:    PropTypes.func.isRequired,
    stories:     PropTypes.instanceOf(List).isRequired
  }

  componentDidMount() {
    this.props.dispatch(StoryActions.getUserStories())
  }

  render () {
    const stories = this.props.stories.toJS()
      .map(story => ({
        title: story.title,
        href:  '/stories/' + story.id
      }));

    return (
      <CardsView items={stories} emptyMsg="User has no stories!" />
    );
  }
}
