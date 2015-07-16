import { fromJS }             from 'immutable';

const defaultState = fromJS({
  users:      [],
  regError:   null,
  regSuccess: null
});

export default function usersReducer(state = defaultState, action) {
  switch(action.type) {
    case 'GET_USERS':
      return state.set('users', action.res.data);

    case 'REGISTRATION_SUCCESS':
      return state.set('regSuccess', action.res.text);

    case 'REGISTRATION_ERROR':
      return state.set('regError', action.error.data.message);

    default:
      return state;
  }
}
