import request       from 'axios';
import path          from 'path';
import createSetter  from 'lib/createSetter';

export const setChapter          = createSetter('SET_CHAPTER', 'chapter');
export const setFocusedParagraph = createSetter('SET_FOCUSED_PARAGRAPH', 'index');
export const setLoading          = createSetter('SET_LOADING', 'loading');
export const setEditing          = createSetter('SET_EDITING', 'editing');
export const setAlignment        = createSetter('SET_ALIGNMENT', 'alignment', 'index');
export const setFont             = createSetter('SET_FONT', 'font', 'index');

export function setSubChapter (type, index, changes) {
  return {
    type:    'SET_SUBCHAPTER',
    subType: type,
    index,
    chapter: changes
  }
}

// Load chapter by ID
export function getChapter(id) {
  return {
    type:    'GET_CHAPTER',
    promise: request.get('/chapters/' + id)
  };
}

export function postChapter(child, parentID) {
  const url = parentID ? path.join('/chapters', parentID) : '/chapters';

  return {
    type:    'POST_CHAPTER',
    promise: request.post(url, child)
  };
}

export function patchChapter(id, chapter) {
  return {
    type:    'PATCH_CHAPTER',
    promise: request.patch(path.join('/chapters', id), chapter)
  };
}

export function deleteChapter(id) {
  return {
    type:    'DELETE_CHAPTER',
    promise: request.delete(path.join('/chapters', id))
  };
}

// Flush whatever's in memory
export function flushChapter() {
  return {
    type: 'FLUSH_CHAPTER'
  };
}
