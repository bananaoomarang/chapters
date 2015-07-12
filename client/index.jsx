import React                     from 'react';
import { Router }                from 'react-router';
import { history }               from 'react-router/lib/BrowserHistory';
import axios                     from 'axios';
import { createRedux }           from 'redux';
import { Provider }              from 'redux/react';
import routes                    from 'routes';
import * as reducers             from 'reducers';
import { immutifyComposedState } from 'lib/immutify';

// Load styles
require('normalize.css/normalize');

require('./sass/app');

// Prepend all axios requests with API address
axios.interceptors.request.use( (cfg) => {
  cfg.url = '/api' + cfg.url;

  return cfg;
});

// Re-immutify the data. Seems a little dirty, but how else?

const initialState = immutifyComposedState(window.__INITIAL_DATA__);

const redux = createRedux(reducers, initialState);

React.render(
  <Provider redux={redux}>
    {() =>
      <Router children={routes} history={history} />
    }
  </Provider>,
  document.getElementById('react-view')
);
