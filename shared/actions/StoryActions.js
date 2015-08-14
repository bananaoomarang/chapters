import request  from 'axios';
import getToken from 'lib/getToken'

export function postStory (story) {
  const token = getToken(); 

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

export function getStory (params) {
  const token = getToken(); 

  const opts = {
    headers: {
      Authorization: 'Bearer ' + token
    }
  };

  return {
    type: 'GET_STORY',
    promise: request.get('/stories/' + params.id)
  }
}
