import request       from 'axios';
import createSetter  from 'lib/createSetter';

export const setChapter          = createSetter('SET_CHAPTER', 'chapter');
export const setFocusedParagraph = createSetter('SET_FOCUSED_PARAGRAPH', 'index');
export const setLoading          = createSetter('SET_LOADING', 'loading');
export const setEditing          = createSetter('SET_EDITING', 'editing');
export const setAlignment        = createSetter('SET_ALIGNMENT', 'alignment', 'index');
export const setFont             = createSetter('SET_FONT', 'font', 'index');

// Load chapter by ID
export function getChapter(routeParams) {
  console.log(routeParams);
  const url = '/stories/' + [routeParams.id, routeParams.section, routeParams.chapter].join('/');

  return {
    type:    'GET_CHAPTER',
    promise: request.get(url)
  };
}

export function postChapter(routeParams, chapter) {
  const url = '/stories/' + [routeParams.id, routeParams.section].join('/');

  return {
    type:    'POST_CHAPTER',
    promise: request.post(url, chapter)
  };
}

export function patchChapter(routeParams, chapter) {
  const url = '/stories/' + [routeParams.id, routeParams.section, chapter.id].join('/');

  return {
    type:    'PATCH_CHAPTER',
    promise: request.patch(url)
  };
}

export function deleteChapter(routeParams, id) {
  const url = '/stories/' + [routeParams.id, routeParams.section, id].join('/');

  return {
    type:    'DELETE_CHAPTER',
    promise: request.del(url)
  };
}
