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

    case 'PATCH_SECTION':
      return state.mergeDeepIn(['section'], fromJS(action.res.data));

    case 'GET_SECTION':
      return sectionReducer(state, {
        type: 'SET_SECTION',
        section: fromJS(action.res.data)
      });

    case 'SET_SECTION':
      return state.set('section', Section(action.section));

    default:
      return state;
  }
}
