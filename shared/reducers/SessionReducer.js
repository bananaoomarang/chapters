import { fromJS }     from 'immutable';
import { Breadcrumb } from 'records/Records'

 const defaultState = fromJS({
   //
   // Session details
   //
   name:  null,
   token: null,
   error: null,
   legit: false,

   //
   // Interface
   //
   nightMode: ( (new Date()).getHours() >= 21) && ( (new Date().getHours()) <= 6),

   //
   // API Interaction
   //
   loading: false,

   breadcrumbs: []
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
         name:  action.res.data
       });

     case 'VALIDATE_SESSION_FAILURE':
       return state.merge({
         legit: false,
         error: action.error.data.message
       });

    case 'SET_LOADING':
      return state.set('loading', action.loading);

    case 'SET_NIGHT_MODE':
      return state.set('nightMode', action.bool);

    case 'PUSH_BREADCRUMB':
      return state.set('breadcrumbs', state.get('breadcrumbs').push(new Breadcrumb(action.crumb)));

    case 'POP_BREADCRUMB':
      return state.set('breadcrumbs', state.get('breadcrumbs').pop());

    case 'FLUSH_BREADCRUMBS':
      return state.set('breadcrumbs', fromJS([]));

     default:
       return state;
   }
 }
