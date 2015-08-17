import request  from 'axios';

export function postStory (story) {
  return {
    type: 'POST_STORY',
    promise: request.post('/stories', story)
  };
}

export function getStory (params) {
  return {
    type: 'GET_STORY',
    promise: request.get('/stories/' + params.id)
  }
}
