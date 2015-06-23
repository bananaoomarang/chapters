import request from 'axios';
import alt     from '../alt';

class StoryActions {

  // Load story from backend
  loadStory(id) {
    const sessionToken = window.sessionStorage.getItem('token');

    const opts = {
      headers: {
        Authorization: 'Bearer ' + sessionToken
      }
    };

    request
      .get('/stories/' + id, opts)
      .then( (res) => {
        this.dispatch(res.body);
      })
      .catch(console.error);
  }

  loadUserStories(username) {
    const sessionToken = window.sessionStorage.getItem('token');

    const opts = {
      headers: {
        Authorization: 'Bearer ' + sessionToken
      }
    };

    request
      .get('/users/' + username + '/stories', opts)
      .then( (res) => {
        this.dispatch(res.body);
      })
      .catch(console.error);
  }

}

export default alt.createActions(StoryActions);
