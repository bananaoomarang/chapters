'use strict';

import React        from 'react';
import { Link }     from 'react-router';
import StoryReducer from 'reducers/StoryReducer';
import StoryActions from 'actions/StoryActions';

var Stories = {
  statics: {
    registerReducer: StoryReducer
  },

  componentDidMount () {
    StoryActions.loadUserStories(this.props.params.user);
  },

  render () {
    return (
      <div id="users">
      ()s{
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
