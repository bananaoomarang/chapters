import React, { PropTypes } from 'react';
import { connect }          from 'react-redux';
import * as StoryActions    from 'actions/StoryActions';
import CardsView            from 'components/CardsView';
import capitalize           from 'lib/capitalize';

@connect(state => ({
  story: state.story.get('story')
}))

export default class Story extends React.Component {
  static propTypes = {
    routeParams: PropTypes.object.isRequired,
    story:       PropTypes.object.isRequired
  }

  static needs = [
    StoryActions.getStory
  ]

  render() {
    const sections = this.props.story.get('sections')
      .map(section => {
        return {
          title: section.title,
          body:  <em>{section.description}</em>,
          href:  '/stories/' + this.props.routeParams.id + '/' + section.id
        };
      })
      .concat([
        {
          title: 'New Section',
          body: '+',
          href: '/stories/' + this.props.routeParams.id + '/new'
        }
      ]);

    return (
      <div id="story">
          <CardsView 
            elements={sections}
            header={this.props.story.get('title')}
            subheader={'By ' + capitalize(this.props.story.get('author'))}
            emptyMsg="No sections"
            editable={true}
            onReorder={()=>{}}
            handleSave={()=>{}} />
      </div>
    );
  }
}
