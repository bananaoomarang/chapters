import request          from 'axios';
import alt              from '../alt';
import ParagraphActions from '../actions/ParagraphActions.js';

class EditorActions {

  // Set whether the to display loading interface
  setLoading(bool) {
    this.dispatch(bool);
  }

  // Load story from backend
  fetchStory(id) {
    const sessionToken = window.sessionStorage.getItem('token');

    const opts = {
      headers: {
        Authorization: 'Bearer ' + sessionToken
      }
    };

    request
      .get('/stories/' + id, opts)
      .then( ({ data }) => {
        // I know action chains are bad. I'm sorry, K?
        ParagraphActions.setParagraphs(data.html);

        this.actions.setStory(data);
      })
      .catch(console.error);

  }

  // Set the story currently being edited from object
  setStory(story) {
    this.dispatch(story);
  }

  // Load a list of possibly editable stories for user
  populateStories() {
    const sessionToken = window.sessionStorage.getItem('token');

    const opts = {
      headers: {
        Authorization: 'Bearer ' + sessionToken
      }
    };

    request
      .get('/users/current/stories', opts)
      .then( ({ data }) => this.dispatch(data))
      .catch(console.error);
  }

  // Upload the story
  save(payload) {
    const sessionToken = window.sessionStorage.getItem('token');

    let opts = {
      method:  'post',
      url:     '',
      data:    payload,
      headers: {
        Authorization: 'Bearer ' + sessionToken
      }
    };

    if(payload.id) {
      opts.url = '/stories/' + payload.id;
    } else {
      opts.url = '/stories/import';
    }

    request(opts)
      .then( (story) => {
        console.log('Successfully saved %s', story.title);
      })
      .catch(console.error);

  }

}

export default alt.createActions(EditorActions);
