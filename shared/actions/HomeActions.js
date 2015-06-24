import request from 'axios';
import alt     from '../alt';

class HomeActions {

  // Load stories
  loadStories() {
    request
      .get('/stories')
      .then( ({ data }) => this.dispatch(data))
      .catch(console.error);
  }

}

export default alt.createActions(HomeActions);
