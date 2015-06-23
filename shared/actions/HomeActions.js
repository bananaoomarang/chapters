import request from 'axios';
import alt     from '../alt';

class HomeActions {

  // Load stories
  loadStories() {
    request
      .get('/stories')
      .then(this.dispatch)
      .catch(console.error);
  }

}

export default alt.createActions(HomeActions);
