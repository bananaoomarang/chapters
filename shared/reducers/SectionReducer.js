import { fromJS }  from 'immutable';
import { Section } from 'records/Records';

const defaultState = fromJS({
  section: new Section(),
  error:   null
});

export default function sectionReducer (state = defaultState, action) {
  switch(action.type) {
    case 'POST_SECTION':
      return state.setIn(['section', 'id'], action.res.data.id);

    case 'GET_SECTION':
      return state.set('section', fromJS(action.res.data));

    default:
      return state;
  }
}
