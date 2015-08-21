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
    const sections = this.props.story.get('sections').toJS()
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
        <h1>{this.props.story.get('title')}</h1>

        <h3>By {capitalize(this.props.story.get('author'))}</h3>

        <CardsView items={sections} emptyMsg="No sections"/>
      </div>
    );
  }
}
