import request       from 'axios';
import path          from 'path';
import createSetter  from 'lib/createSetter';

export const setChapter          = createSetter('SET_CHAPTER', 'chapter');
export const setFocusedParagraph = createSetter('SET_FOCUSED_PARAGRAPH', 'index');
export const setLoading          = createSetter('SET_LOADING', 'loading');
export const setEditing          = createSetter('SET_EDITING', 'editing');
export const setAlignment        = createSetter('SET_ALIGNMENT', 'alignment', 'index');
export const setFont             = createSetter('SET_FONT', 'font', 'index');

// Load chapter by ID
export function getChapter(routeParams) {
  return {
    type:    'GET_CHAPTER',
    promise: request.get('/chapters/' + routeParams.id)
  };
}

export function postChapter(child, parent) {
  const url = parent ? path.join('/chapters', parent.id) : '/chapters';

  return {
    type:    'POST_CHAPTER',
    promise: request.post(url, child)
  };
}

export function patchChapter(routeParams, chapter) {
  return {
    type:    'PATCH_CHAPTER',
    promise: request.patch(path.join('/chapters', routeParams.id), chapter)
  };
}

export function deleteChapter(routeParams) {
  return {
    type:    'DELETE_CHAPTER',
    promise: request.del(path.join('/chapters', routeParams.id))
  };
}
