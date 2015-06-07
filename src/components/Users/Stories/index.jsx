'use strict';

var React        = require('react');
var Link         = require('react-router').Link;
var StoryStore   = require('../../../stores/StoryStore');
var StoryActions = require('../../../actions/StoryActions');

var Stories = {
  displayName: 'Stories',

  getInitialState: function () {
    return {
      stories: StoryStore.getUserStories()
    };
  },

  onStoryChange: function () {
    this.setState({
      stories: StoryStore.getUserStories()
    });
  },

  componentDidMount: function () {
    StoryStore.addChangeListener(this.onStoryChange);

    StoryActions.loadUserStories(this.props.params.user);
  },

  render: function () {
    return (
      <div id="users">
        {
          this.state.stories.map(function (story) {
            return (
              <div>
                <Link to="story" params={ { id: story.id } }>{story.title}</Link>
                <br/>
              </div>
            );
          })
        }
      </div>
    );
  }

};

module.exports = React.createClass(Stories);
