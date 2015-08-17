import request from 'axios';

export function postSection (section, routeParams) {
  const url = '/stories/' + routeParams.id;

  return {
    type:    'POST_SECTION',
    promise: request.post(url, section)
  };
}

export function getSection (routeParams) {
  const url = '/stories/' + routeParams.id + '/' + routeParams.section;

  return {
    type:    'GET_SECTION',
    promise: request.get(url)
  };
}
