import request from 'axios';

// Load chapters
export function getStories() {
  return {
    type:    'GET_HOME_STORIES',
    promise: request.get('/stories')
  };
}
