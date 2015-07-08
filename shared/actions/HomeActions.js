import request              from 'axios';
import { GET_HOME_STORIES } from 'consts/Actions';

// Load stories
export function loadStories() {
  return dispatch => {
    request
    .get('/stories')
    .then( ({ data }) => dispatch({ type: GET_HOME_STORIES, list: data }))
    .catch(err => console.error(err));
  };
}
