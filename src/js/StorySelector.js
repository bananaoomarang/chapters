'use strict';

var React          = require('react');
var EditorActions = require('./actions/EditorActions');

var StorySelector = {
  handleSelection: function (event) {
    console.log('User selected: %s', event.target.innerText);

    EditorActions.setStory({
      title: event.target.innerText
    });

    EditorActions.setLoading(false);
  },

  render: function () {

    return (
      React.createElement("div", {id: "story-selector", style: this.props.style}, 
        React.createElement("ul", null, 
          
            this.props.storyList.map(function(story, index) {
              return React.createElement("li", {key: index, onClick: this.handleSelection}, story.title);
            }.bind(this))
          
        )
      )
    );
  }
};

module.exports = React.createClass(StorySelector);
