import React, { PropTypes } from 'react';
import { connect }          from 'react-redux';
import * as StoryActions    from 'actions/StoryActions';
import Form                 from 'components/Form';

@connect(state => ({
  username: state.session.get('name'),
  story:    state.story.get('story'),
  error:    state.story.get('error')
}))

export default class NewStory extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    history:  PropTypes.object.isRequired,
    chapter:  PropTypes.object.isRequired,
    username: PropTypes.string.isRequired,
    error:    PropTypes.string
  }

  render() {
    const cfg = {
      id:            'story-form',
      submitText:    'Next',
      actionCreator: StoryActions.postStory,
      error: this.props.error,

      fields: [
        {
          name:        'title',
          placeholder: 'The Iliad'
        },
        {
          name:        'author',
          placeholder: 'Homer'
        }
      ],

      alsoDispatch: {
        owner:    this.props.username,
        sections: []
      },

      didDispatch: success => {
        if(success)
          this.props.history.pushState(null, '/chapters/' + this.props.chapter.get('id'));
      }
    };

    return (
      <Form {...cfg} />
    );
  }
}
