import request  from 'axios';
import getToken from 'lib/getToken'

export function postSection (storyId, section) {
  const token = getToken(); 

  const opts = {
    headers: {
      Authorization: 'Bearer ' + token
    }
  };

  const URL = '/stories/' + storyId + '/';

  return {
    type: 'POST_SECTION',
    promise: request.post(URL, section, opts)
  };
}

export function getSection (params) {
  const token = getToken(); 

  const opts = {
    headers: {
      Authorization: 'Bearer ' + token
    }
  };

  return {
    type: 'GET_SECTION',
    promise: request.get('/stories/' + params.id)
  }
}
