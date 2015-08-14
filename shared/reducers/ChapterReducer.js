import { List, fromJS } from 'immutable';
import { Chapter }      from 'records/Records';

const defaultState = fromJS({
  chapter: new Chapter(),

  // Global styles
  alignment: 'left',
  font:      {
    size: 24
  },

  // Stories it is possible to edit with current permissions
  userStories: [],

  // Interface state
  loading:   false,
  editing:   false
});

export default function chapterReducer(state = defaultState, action) {
  switch(action.type) {
    case 'GET_CHAPTER':
      const chapter = {
        id: action.res.data._id,
        ...action.res.data
      };

      // TODO Dude. You control the API.
      delete chapter._id;

      return chapterReducer(state, {
        type: 'SET_CHAPTER',
        chapter
      });

    case 'SET_CHAPTER':
      return state
        .mergeDeepIn(['chapter'], action.chapter)
        .setIn(['chapter', 'paragraphs'], List(action.chapter.paragraphs || state.getIn(['chapter', 'paragraphs'])));

    case 'SET_EDITABLE_CHAPTERS':
      return state.set('editableStories', fromJS(action.list));

    case 'SET_LOADING':
      return state.set('loading', action.loading);

    case 'SET_EDITING':
      return state.set('editing', action.editing);

    case 'SET_FOCUSED_PARAGRAPH':
      return state.setIn(['chapter', 'focusedParagraph'], Number(action.index));

    case 'SET_FONT':
      if(action.index === -1) return state.merge({ font: action.font });

      return state.mergeIn(['chapter', 'paragraphs', action.index], { font: action.font });

    case 'SET_ALIGNMENT':
      if(action.index === -1) return state.set('alignment', action.alignment);

      return state.setIn(['chapter', 'paragraphs', action.index, 'alignment'], action.alignment);

    default:
      return state;
  }
}
