import request  from 'axios';
import getToken from 'lib/getToken'

// Load chapters
export function getStories() {
  const token = getToken();

  const opts = {
    headers: {
      Authorization: 'Bearer ' + token
    }
  };

  return {
    type:    'GET_HOME_STORIES',
    promise: request.get('/stories')
  };
}
