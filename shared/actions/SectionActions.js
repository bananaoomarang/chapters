import request from 'axios';

export function postSection (section, routeParams) {
  const url = '/stories/' + routeParams.id;

  return {
    type:    'POST_SECTION',
    promise: request.post(url, section)
  };
}

export function getSection (routeParams) {
  const url = '/stories/' + [routeParams.id, routeParams.section].join('/');

  return {
    type:    'GET_SECTION',
    promise: request.get(url)
  };
}

export function patchSection (section, routeParams) {
  const url = '/stories/' + [routeParams.id, routeParams.section].join('/');

  return {
    type: 'PATCH_SECTION',
    promise: request.patch(url, section)
  }
}

export function setSection (section) {
  return {
    type: 'SET_SECTION',
    section
  };
}
