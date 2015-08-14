'use strict';

import React        from 'react';
import { Link }     from 'react-router';
import ChapterReducer from 'reducers/ChapterReducer';
import ChapterActions from 'actions/ChapterActions';

var Stories = {
  statics: {
    registerReducer: ChapterReducer
  },

  componentDidMount () {
    ChapterActions.loadUserStories(this.props.params.user);
  },

  render () {
    return (
      <div id="users">
      ()s{
          this.state.chapters.map(function (chapter) {
            return (
              <div>
                <Link to="chapter" params={ { id: chapter.id } }>{chapter.title}</Link>
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
