'use strict';

var React         = require('react');
var EditorActions = require('./actions/EditorActions');

var StorySelector = {
  handleSelection: function (event) {
    console.log('User selected: %s', event.target.innerText);

    this.props.storyList.forEach(function (story) {

      if(story.title === event.target.innerText) {
        EditorActions.setStory(story);
      }

    });


    EditorActions.setLoading(false);
  },

  render: function () {

    return (
      <div id="story-selector" style={this.props.style}>
        <ul>
          {
            this.props.storyList.map(function(story, index) {
              return <li key={index} onClick={this.handleSelection}>{story.title}</li>;
            }.bind(this))
          }
        </ul>
      </div>
    );
  }
};

module.exports = React.createClass(StorySelector);
