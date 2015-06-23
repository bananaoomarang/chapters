'use strict';

import React        from 'react';
import { Link }     from 'react-router';
import MagicState   from 'alt/mixins/ReactStateMagicMixin';
import StoryStore   from '../../../stores/StoryStore';
import StoryActions from '../../../actions/StoryActions';

var Stories = {
  displayName: 'Stories',

  mixins: [MagicState],

  statics: {
    registerStore: StoryStore
  },

  componentDidMount: function () {
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
