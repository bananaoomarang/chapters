// Should be merged with Editor code. No need for duplication.

import alt          from '../alt';
import StoryActions from '../actions/StoryActions';

class StoryStore {
  constructor() {
    this.loadedUser   = [];
    this.currentStory = {
      title:  '',
      author: '',
      text:   '',
      html:   ''
    };

    this.bindListeners({
      handleUserStories: StoryActions.LOAD_USER_STORIES,
      handleStory:       StoryActions.LOAD_STORY
    });
  }

  handleUserStories(list) {
    this.loadedUser = list;
  }

  handleStory(story) {
    this.currentStory = story;
  }
}

module.exports = alt.createStore(StoryStore);
