import { immutify }         from 'lib/immutify';
import { List }             from 'immutable';
import { GET_HOME_STORIES } from 'consts/Actions';

const defaultState = immutify({
  stories: []
});

export default function homeReducer(state = defaultState, action) {
  switch(action.type) {
    case GET_HOME_STORIES:
      return state.set('stories', List(action.list));
    default:
      return state;
  }
}
