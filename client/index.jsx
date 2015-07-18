import React               from 'react';
import { Router }          from 'react-router';
import { history }         from 'react-router/lib/BrowserHistory';
import axios               from 'axios';
import { Provider }        from 'react-redux';
import createRoutes        from 'routes';
import * as reducers       from 'reducers';
import  immutifyState      from 'lib/immutifyState';
import promiseMiddleware   from 'lib/promiseMiddleware';
import fetchComponentData  from 'lib/fetchComponentData';
import { createStore,
         combineReducers,
         applyMiddleware } from 'redux';

// Load styles
require('normalize.css/normalize');

require('./sass/app');

// Prepend all axios requests with API address
axios.interceptors.request.use( (cfg) => {
  cfg.url = '/api' + cfg.url;

  return cfg;
});

// Re-immutify the data. Seems a little dirty, but how else?
const initialState = immutifyState(window.__INITIAL_DATA__);

const reducer = combineReducers(reducers);
const store   = applyMiddleware(promiseMiddleware)(createStore)(reducer, initialState);

// Note how we fill the next route on route leave.
// We don't waste time re-fetching when we're hydrated from server.
function onRouteLeave(nextState, transition, done) {
  fetchComponentData(store.dispatch, nextState.branch.map(b => b.component), nextState.params)
    .then(()   => done())
    .catch(err => console.log(err));
}

const routes = createRoutes(onRouteLeave);

React.render(
  <Provider store={store}>
    {() =>
      <Router children={routes} history={history} />
    }
  </Provider>,
  document.getElementById('react-view')
);
