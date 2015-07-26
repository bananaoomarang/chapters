import request from 'axios';

// Load stories
export function getStories() {
  console.log(request);
  return {
    type:    'GET_HOME_STORIES',
    promise: request.get('/stories')
  };
}
