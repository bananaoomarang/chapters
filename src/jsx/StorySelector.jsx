'use strict';

var React          = require('react');
var ToolbarActions = require('./actions/ToolbarActions');

var StorySelector = {
  getInitialState: function () {

    return { 
      storyList: [
        {
          title: 'Love and Justice in Montana'
        },
        {
          title: 'Visions of Tel Aviv'
        },
        {
          title: 'Polterguests of beverly Hills'
        },
        {
          title: 'The Mystery of the Never Letting On'
        }
      ] 
    };

  },

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
            this.state.storyList.map(function(story) {
              return <li onClick={this.handleSelection}>{story.title}</li>;
            }.bind(this))
          }
        </ul>
      </div>
    );
  }
};

module.exports = React.createClass(StorySelector);
