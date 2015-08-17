import { fromJS } from 'immutable';
import { Story }  from 'records/Records';

const defaultState = fromJS({
  story: new Story(),
  error: null
});

export default function storyReducer(state = defaultState, action) {
  switch(action.type) {
    case 'POST_STORY':
      return state.setIn(['story', 'id'], action.res.data.id);

    case 'POST_STORY_FAILURE':
      return state.set('error', action.res.data);

    case 'GET_STORY':
      return state.set('story', Story(fromJS(action.res.data)));

    default:
      return state;
  }
}
