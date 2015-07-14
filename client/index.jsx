import React                            from 'react';
import { Router }                       from 'react-router';
import { history }                      from 'react-router/lib/BrowserHistory';
import axios                            from 'axios';
import { createStore, combineReducers } from 'redux';
import { Provider }                     from 'react-redux';
import routes                           from 'routes';
import * as reducers                    from 'reducers';
import  immutifyState                   from 'lib/immutifyState';

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
const store   = createStore(reducer, initialState);

React.render(
  <Provider store={store}>
    {() =>
      <Router children={routes} history={history} />
    }
  </Provider>,
  document.getElementById('react-view')
);
