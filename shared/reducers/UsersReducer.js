import { List }  from 'immutable';
import GET_USERS from 'consts/Actions';

const defaultState = new List();

export default function usersReducer(state = defaultState, action) {
  switch(action.type) {
    case GET_USERS:
      return new List(action.list);
    default:
      return state;
  }
}
