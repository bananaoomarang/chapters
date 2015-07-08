// Should be merged with Editor code. No need for duplication.

class StoryStore {
  constructor() {
    this.loadedUser   = [];
    this.currentStory = {
      title:  '',
      author: '',
      text:   '',
      html:   ''
    };

    this.bindActions(this.alt.getActions('story'));
  }

  onLoadUserStories(list) {
    this.loadedUser = list;
  }

  onLoadStory(story) {
    this.currentStory = story;
  }
}

module.exports = StoryStore;
