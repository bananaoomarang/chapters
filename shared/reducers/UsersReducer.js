import { immutify } from 'lib/immutify';
import { GET_USERS,
         REGISTRATION_SUCCESS,
         REGISTRATION_ERROR } from 'consts/Actions';

const defaultState = immutify({
  users:      [],
  regError:   null,
  regSuccess: null
});

export default function usersReducer(state = defaultState, action) {
  switch(action.type) {
    case GET_USERS:
      return state.set('users', action.list);

    case REGISTRATION_SUCCESS:
      return state.set('regSuccess', action.msg);

    case REGISTRATION_ERROR:
      return state.set('regError', action.error);

    default:
      return state;
  }
}
