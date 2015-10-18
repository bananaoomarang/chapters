require('promise.prototype.finally');

import React                from 'react';
import { render }           from 'react-dom';
import { Router }           from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import axios                from 'axios';
import { Provider }         from 'react-redux';
import routes               from 'routes';
import * as reducers        from 'reducers';
import * as SessionActions  from 'actions/SessionActions';
import immutifyState        from 'lib/immutifyState';
import promiseMiddleware    from 'lib/promiseMiddleware';
import fetchComponentData   from 'lib/fetchComponentData';
import getToken             from 'lib/getToken';
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

let stores = [createStore];

if (__DEV__ && __DEVTOOLS__) {
  const { devTools, persistState } = require('redux-devtools');

  stores.unshift(devTools(), persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/)));
}

const finalCreateStore = compose.apply(null, stores);

const store = applyMiddleware(promiseMiddleware)(finalCreateStore)(reducer, initialState);

const history = createBrowserHistory();

if (__DEV__ && __DEVTOOLS__) {
  const { DevTools, DebugPanel, LogMonitor } = require('../node_modules/redux-devtools/lib/react');

  React.render(
    <div>
      <Provider store={store} key="provider">
        <Router children={routes} history={history} />
      </Provider>

      <DebugPanel top right bottom key="malone">
        <DevTools store={store} monitor={LogMonitor} />
      </DebugPanel>
    </div>,
    document.getElementById('react-view')
  );
} else {
  render(
    <Provider store={store} key="provider">
      <Router children={routes} history={history} />
    </Provider>,
    document.getElementById('react-view')
  );
}

