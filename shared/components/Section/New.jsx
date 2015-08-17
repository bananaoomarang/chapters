import React, { PropTypes } from 'react';
import { connect }          from 'react-redux';
import * as SectionActions  from 'actions/SectionActions';
import Form                 from 'components/Form';

@connect(state => ({
  section:  state.section.get('section'),
  error:    state.story.get('error')
}))

export default class NewStory extends React.Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  static propTypes = {
    section:     PropTypes.object.isRequired,
    routeParams: PropTypes.object.isRequired
  }

  render() {
    const cfg = {
      id:            'section-form',
      submitText:    'Next',
      actionCreator: SectionActions.postSection,

      fields: [
        {
          name:        'title',
          placeholder: 'Homer\'s Demise'
        },
        {
          name:        'description',
          placeholder: 'Times to be had'
        }
      ],
      didDispatch: success => {
        if(success)
          this.context.router.transitionTo('/stories/' + this.props.routeParams.id + '/' + this.props.section.get('id'));
      }
    };

    return (
      <Form {...cfg} />
    );
  }
}
