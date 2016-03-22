require('promise.prototype.finally');

import React                      from 'react';
import { render }                 from 'react-dom';
import { Router, browserHistory } from 'react-router';
import axios                      from 'axios';
import { Provider }               from 'react-redux';
import { createDevTools }         from 'redux-devtools';
import LogMonitor                 from 'redux-devtools-log-monitor';
import DockMonitor                from 'redux-devtools-dock-monitor';
import createRoutes               from 'routes';
import * as reducers              from 'reducers';
import immutifyState              from 'lib/immutifyState';
import promiseMiddleware          from 'lib/promiseMiddleware';
import fetchComponentData         from 'lib/fetchComponentData';
import getToken                   from 'lib/getToken';
import { createStore,
         compose,
         combineReducers,
         applyMiddleware } from 'redux';

Object.assign = require('object-assign');

// Load styles
require('normalize.css/normalize');

require('./sass/app');

// Prepend all axios requests with API address
// Add Authentication
axios.interceptors.request.use(cfg => {
  const sessionToken = getToken();

  cfg.url = '/api' + cfg.url;

  if(sessionToken)
    cfg.headers.Authorization = 'Bearer ' + sessionToken;

  return cfg;
});

// Re-immutify the data. Seems a little dirty, but how else?
const initialState = immutifyState(window.__INITIAL_DATA__);
const reducer      = combineReducers(reducers);

const DevTools = createDevTools(
  <DockMonitor toggleVisibilityKey="H" changePositionKey="Q" defaultIsVisible={false}>
    <LogMonitor />
  </DockMonitor>
);

let stores = [applyMiddleware(promiseMiddleware)];

if (__DEV__ && __DEVTOOLS__) {
  const { devTools, persistState } = require('redux-devtools');

  stores.push(DevTools.instrument(), persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/)));
}

const finalCreateStore = compose.apply(null, stores)(createStore);

const store = finalCreateStore(reducer, initialState);

const routes = createRoutes(function (nextState, transition, done) {
  if(nextState.location.action === 'POP')
      return done();

  const components = nextState.routes.map(route => route.component);

  fetchComponentData(store.dispatch, components, nextState.params)

  return done();
});

if (__DEV__ && __DEVTOOLS__) {
  render(
    <Provider store={store}>
      <div>
          <Router children={routes} history={browserHistory} />
        <DevTools />
      </div>
    </Provider>,
    document.getElementById('react-view')
  );
} else {
  render(
    <Provider store={store}>
      <Router children={routes} history={history} />
    </Provider>,
    document.getElementById('react-view')
  );
}

