'use strict';

var React          = require('react');
var ToolbarActions = require('./actions/ToolbarActions');

var StorySelector = {
  handleSelection: function (event) {
    console.log('User selected: %s', event.target.innerText);

    ToolbarActions.setStory({
      title: event.target.innerText
    });

    ToolbarActions.setLoading(false);
  },

  render: function () {

    return (
      <div id="story-selector" style={this.props.style}>
        <ul>
          {
            this.props.storyList.map(function(story) {
              return <li onClick={this.handleSelection}>{story.title}</li>;
            }.bind(this))
          }
        </ul>
      </div>
    );
  }
};

module.exports = React.createClass(StorySelector);
