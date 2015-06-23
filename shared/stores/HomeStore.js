import alt         from '../alt';
import HomeActions from '../actions/HomeActions';

class HomeStore {
  constructor() {
    // List of stories in system
    this.stories = [];

    this.bindListeners({
      handleStories: HomeActions.LOAD_STORIES
    });
  }

  handleStories(list) {
    this.stories = list;
  }
}

export default alt.createStore(HomeStore);
