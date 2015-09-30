import { fromJS, List } from 'immutable';

const defaultState = fromJS({
  users:      [],
  stories:    [], // Selected user's stories
  personas:   [], // Selected user's personas
  regError:   null,
  regSuccess: null
});

export default function usersReducer(state = defaultState, action) {
  switch(action.type) {
    case 'GET_USERS':
      return state.set('users', List(action.res.data));

    case 'GET_USER_STORIES':
      return state.set('stories', List(action.res.data));

    case 'GET_USER_PERSONAS':
      return state.set('personas', List(action.res.data));

    case 'REGISTER':
      return state.set('regSuccess', action.res.text);

    case 'REGISTER_FAILURE':
      return state.set('regError', action.error.data.message);

    default:
      return state;
  }
}
