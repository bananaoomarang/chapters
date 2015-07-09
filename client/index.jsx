import React           from 'react';
import Router          from 'react-router';
import axios           from 'axios';
import { createRedux } from 'redux';
import { Provider }    from 'redux/react';
import routes          from 'routes';
import * as reducers   from 'reducers';

// Load styles
require('normalize.css/normalize');
require('./sass/app');

// Prepend all axios requests with API address
axios.interceptors.request.use( (cfg) => {
  cfg.url = '/api' + cfg.url;

  return cfg;
});

// TODO Rehydration
const redux = createRedux(reducers);

Router.run(routes, Router.HistoryLocation, function (Handler, state) {

  React.render(
    <Provider redux={redux}>
      {() =>
        <Handler {...state} />
      }
    </Provider>,
    document.body);
});

