import request from 'axios';
import {
  LOAD_STORY,
  LOAD_USER_STORIES
} from 'conts/Actions';

export function loadStory(id) {
  const sessionToken = window.sessionStorage.getItem('token');

  const opts = {
    headers: {
      Authorization: 'Bearer ' + sessionToken
    }
  };

  return dispatch => {

    request
      .get('/stories/' + id, opts)
      .then( ({ data }) => dispatch({ type: LOAD_STORY, data }))
      .catch(err => console.error(err));
  };
}

export function loadUserStories(username) {
  const sessionToken = window.sessionStorage.getItem('token');

  const opts = {
    headers: {
      Authorization: 'Bearer ' + sessionToken
    }
  };

  return dispatch => {
    request
      .get('/users/' + username + '/stories', opts)
      .then( ({ data }) => dispatch({ type: LOAD_USER_STORIES, data }))
      .catch(err => console.error(err));
  };
}
