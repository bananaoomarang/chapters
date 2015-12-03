import React, { PropTypes } from 'react';
import { connect }          from 'react-redux';
import { List }             from 'immutable';
import CardsView            from 'components/CardsView';
import capitalize           from 'lib/capitalize';
import * as UsersActions    from 'actions/UsersActions';

@connect(state => ({
  stories:     state.users.get('stories'),
  personas:    state.users.get('personas'),
  currentUser: state.session.get('name')
}))

export default class User extends React.Component {
  static propTypes = {
    dispatch:    PropTypes.func.isRequired,
    routeParams: PropTypes.object.isRequired,

    currentUser: PropTypes.string,
    stories:     PropTypes.instanceOf(List),
    personas:    PropTypes.instanceOf(List)
  }

  componentDidMount() {
    const username = this.props.routeParams.user || this.props.currentUser;

    this.props.dispatch(
      UsersActions.getUserStories(username)
    );

    this.props.dispatch(
      UsersActions.getUserPersonas(username)
    );
  }

  render() {
    const stories = this.props.stories.map(story => ({
      title: story.title       || '???',
      body:  story.description || '???',
      href:  '/chapters/' + story.id
    }));

    const personas = this.props.personas.map(persona => ({
      title: persona.title       || '???',
      body:  persona.description || '???',
      href:  '/users/' + persona.id
    }));

    const loggedIn = (this.props.routeParams.user === this.props.currentUser) || !this.props.routeParams.user;

    return (
      <div>
        <h2>{capitalize(this.props.routeParams.user || 'You')}</h2>

        <hr />

        <CardsView
          elements={stories}
          header="Stories"
          emptyMsg={(loggedIn ? 'You have' : 'User has') + '  no stories :\'('}
          editable={loggedIn}
          createUrl="/chapters/new" />

        <hr />

        <CardsView
          elements={personas}
          header="Personas"
          emptyMsg={(loggedIn ? 'You have' : 'User has') + '  no personas :\'('}
          editable={loggedIn}
          createUrl="/personas/new" />
      </div>
    );
  }
}
