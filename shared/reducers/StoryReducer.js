import { fromJS } from 'immutable';
import { Story }  from 'records/Records';

const defaultState = fromJS({
  story: new Story(),

  // Global styles
  alignment: 'left',
  font:      {
    size: 24
  },

  // Stories it is possible to edit with current permissions
  userStories: [],

  // Interface state
  loading: false,
  editing: false
});

export default function storyReducer(state = defaultState, action) {
  switch(action.type) {
    case 'GET_STORY':
      const story = {
        id: action.res.data._id,
        ...action.res.data
      };

      // TODO Dude. You control the API.
      delete story._rev;
      delete story._id;
      delete story.path;

      return storyReducer(state, {
        type: 'SET_STORY',
        story
      });

    case 'SET_STORY':
      return state
        .mergeDeep({ story: action.story });

    case 'SET_EDITABLE_STORIES':
      return state.set('editableStories', fromJS(action.list));

    case 'SET_LOADING':
      return state.set('loading', action.loading);

    case 'SET_EDITING':
      return state.set('editing', action.editing);

    case 'SET_FOCUSED_PARAGRAPH':
      return state.setIn(['story', 'focusedParagraph'], Number(action.index));

    case 'SET_FONT':
      if(action.index === -1) return state.merge({ font: action.font });

      return state.mergeIn(['story', 'paragraphs', action.index], { font: action.font });

    case 'SET_ALIGNMENT':
      if(action.index === -1) return state.set('alignment', action.alignment);

      return state.setIn(['story', 'paragraphs', action.index, 'alignment'], action.alignment);

    default:
      return state;
  }
}
