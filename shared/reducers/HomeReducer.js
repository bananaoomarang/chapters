import { fromJS }     from 'immutable';
import { GET_HOME_STORIES } from 'consts/Actions';

const defaultState = fromJS({
  stories: []
});

export default function homeReducer(state = defaultState, action) {
  switch(action.type) {
    case GET_HOME_STORIES:
      return state.set('stories', fromJS(action.list));
    default:
      return state;
  }
}
