import React             from 'react';
import { connect }       from 'react-redux';
import { Link }          from 'react-router';
import * as StoryActions from 'actions/StoryActions';

@connect(state => ({
  story: state.story.get('story')
}))

export default class Story extends React.Component {
  static needs = [
    StoryActions.getStory
  ]

  render() {
    const sections = [
      {
        title: 'Lorem',
        description: 'Crazy good read'
      },
      {
        title: 'Lorem',
        description: 'Crazy good read'
      },
      {
        title: 'Lorem',
        description: 'Crazy good read'
      },
      {
        title: 'Lorem',
        description: 'Crazy good read'
      },
      {
        title: 'Lorem',
        description: 'Crazy good read'
      }
    ];

    return (
      <div id="story">
        <h1>{this.props.story.get('title')}</h1>

        <h3>By: {this.props.story.get('author')}</h3>

        <div id="story-sections" className="cards">
          {
            sections.map(section => (
              <Link to="/home">
                <div className="card">
                  <div className="card-header">{section.title}</div>
                  <div className="card-body">{section.description}</div>
                </div>
              </Link>
            ))
          }
        </div>
      </div>
    );
  }
}
