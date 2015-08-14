import request from 'axios';

export function postStory (story) {
  const token = window.sessionStorage.getItem('token');

  const opts = {
    headers: {
      Authorization: 'Bearer ' + token
    }
  };

  return {
    type: 'POST_STORY',
    promise: request.post('/stories', story, opts)
  };
}
