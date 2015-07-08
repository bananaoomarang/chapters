import { Map, List } from 'immutable';
import { GET_STORY,
         GET_EDITABLE_STORIES,
         SET_LOADING } from 'consts/Actions';

const defaultState = new Map({
  // Metadata for story being edited
  story: new Map({
    id:        null,
    title:     '',
    text:      '',
    author:    null,
    wordCount: null
  }),

  // Stories possible to edit
  editableStories: new List(),

  // Interface state
  isLoading: false
});

export default function editorReducer(state = defaultState, action) {
  switch(action.type) {
    case GET_STORY:
      return state.mergeIn('story', action.story);

    case GET_EDITABLE_STORIES:
      return state.set('editableStories', new List(action.list));

    case SET_LOADING:
      return state.set('isLoading', action.bool);

    default:
      return state;
  }
}
