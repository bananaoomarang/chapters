import { fromJS }           from 'immutable';

const defaultState = fromJS({
  stories: []
});

export default function homeReducer(state = defaultState, action) {
  switch(action.type) {
    case 'GET_HOME_STORIES':
      console.log(action.res);
      return state.set('stories', fromJS(action.res.data));

    default:
      return state;
  }
}
