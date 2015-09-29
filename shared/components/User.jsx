import React, { PropTypes } from 'react';
import { connect }          from 'react-redux';
import { List }             from 'immutable';
import CardsView            from 'components/CardsView';
import capitalize           from 'lib/capitalize';
import * as StoryActions    from 'actions/StoryActions';

@connect(state => ({
  stories:     state.story.get('userStories'),
  currentUser: state.session.get('name')
}))

export default class User extends React.Component {
  static propTypes = {
    dispatch:    PropTypes.func.isRequired,
    routeParams: PropTypes.object.isRequired,

    currentUser: PropTypes.string,
    stories:     PropTypes.instanceOf(List)
  }

  componentDidMount() {
    const user = this.props.routeParams.user || this.props.currentUser;

    this.props.dispatch(StoryActions.getUserStories(user));
  }

  render() {
    const cards = this.props.stories.toJS().map(story => ({
      title: story.title       || '???',
      body:  story.description || '???',
      href:  '/chapters/' + story.id
    }));

    const loggedIn = (this.props.routeParams.user === this.props.currentUser) || !this.props.routeParams.user;

    return (
      <div>
        <h2>{capitalize(this.props.routeParams.user || 'You')}</h2>

        <hr />

        <CardsView
          items={cards}
          header="Stories"
          emptyMsg={(loggedIn ? 'You have' : 'User has') + '  no stories :\'('}
          editable={loggedIn}
          createUrl="/chapters/new" />

        <hr />

        <CardsView
          items={cards}
          header="Authors"
          emptyMsg={(loggedIn ? 'You have' : 'User has') + '  no authors :\'('}
          editable={loggedIn}
          createUrl="/authors/new" />
      </div>
    );
  }
}
