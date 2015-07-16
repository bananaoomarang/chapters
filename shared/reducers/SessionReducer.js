import { fromJS }           from 'immutable';

 const defaultState = fromJS({
    name:  null,
    token: null,
    error: null,
    legit: false
 });

 export default function sessionReducer(state = defaultState, action) {
   switch(action.type) {
     case 'OPEN_SESSION':
       // Update window.sessionStorage
       window.sessionStorage.setItem('token', action.res.data);

       return state.merge({
         name:  action.name,
         token: action.res.data,
         legit: true
       });

     case 'OPEN_SESSION_FAILURE':
       return state.set('error', action.error.data.message);

     case 'CLOSE_SESSION':
       return state.merge({
         legit: false,
         error: action.error
       });

     case 'VALIDATE_SESSION':
       return state.merge({
         legit: true,
         name:  action.res.data.name
       });

     default:
       return state;
   }
 }
