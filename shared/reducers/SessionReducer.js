import { fromJS }           from 'immutable';
import { OPEN_SESSION,
         CLOSE_SESSION,
         VALIDATE_SESSION } from 'consts/Actions';

 const defaultState = fromJS({
    name:  null,
    token: null,
    error: null,
    legit: false
 });

 export default function sessionReducer(state = defaultState, action) {
   switch(action.type) {
     case OPEN_SESSION:
       // Update window.sessionStorage
       window.sessionStorage.setItem('token', action.token);

       return state.merge({
         name:  action.name,
         token: action.token,
         legit: true
       });

     case CLOSE_SESSION:
       return state.merge({
         legit: false,
         error: action.error
       });

     case VALIDATE_SESSION:
       return state.merge({
         legit: true,
         name:  action.name
       });

     default:
       return state;
   }
 }
