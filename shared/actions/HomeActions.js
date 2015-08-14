import request      from 'axios';
import ifdefBrowser from 'lib/ifdefBrowser';

// Load chapters
export function getStories() {
  const sessionToken = ifdefBrowser(() => {
    return window.sessionStorage.getItem('token');
  }) || '';

  const opts = {
    headers: {
      Authorization: 'Bearer ' + sessionToken
    }
  };

  return {
    type:    'GET_HOME_STORIES',
    promise: request.get('/stories')
  };
}
