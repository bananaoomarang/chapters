import React  from 'react';
import Router from 'react-router';
import routes from '../shared/routes';
import axios  from 'axios';

// Load styles
require('normalize.css/normalize');
require('./sass/app');

// Prepend all axios requests with API address
axios.interceptors.request.use( (cfg) => {
  cfg.url = '/api' + cfg.url;

  return cfg;
});


Router.run(routes, Router.HistoryLocation, function (Handler, state) {
  React.render(
    <div id="react-view">
      <Handler {...state} />
    </div>,
    document.body);
});

