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
      React.createElement("div", {id: "story-selector", style: this.props.style}, 
        React.createElement("ul", null, 
          
            this.state.storyList.map(function(story) {
              return React.createElement("li", {onClick: this.handleSelection}, story.title);
            }.bind(this))
          
        )
      )
    );
  }
};

module.exports = React.createClass(StorySelector);
