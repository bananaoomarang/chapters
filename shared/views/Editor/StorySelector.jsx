import React         from 'react';
import EditorActions from 'actions/StoryActions';

var StorySelector = {
  handleSelection (event) {
    console.log('User selected: %s', event.target.innerText);

    this.props.storyList.forEach(function (story) {

      var clickedTitle = event.target.innerText;

      if(story.title === clickedTitle) {

        EditorActions.fetchStory(story.id);
        EditorActions.setStory(story);

      }

    });


    EditorActions.setLoading(false);
  },

  render () {
    return (
      <div id="story-selector" style={this.props.style}>
        <ul>
        ()s{
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
