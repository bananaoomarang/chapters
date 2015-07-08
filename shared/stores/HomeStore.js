import { Map, List }        from 'immutable';
import { GET_HOME_STORIES } from 'consts/Actions';

const defaultState = new Map({
  stories: new List()
});

export default function homeReducer(state = defaultState, action) {
  switch(action.type) {
    case GET_HOME_STORIES:
      return state.set('stories', action.list);
    default:
      return state;
  }
}
