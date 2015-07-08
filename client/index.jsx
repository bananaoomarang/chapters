import React        from 'react';
import Router       from 'react-router';
import routes       from 'routes';
import axios        from 'axios';
import AltContainer from 'alt/AltContainer';
import Flux         from 'myAlt';

// Load styles
require('normalize.css/normalize');
require('./sass/app');

// Prepend all axios requests with API address
axios.interceptors.request.use( (cfg) => {
  cfg.url = '/api' + cfg.url;

  return cfg;
});

const flux = new Flux();

Router.run(routes, Router.HistoryLocation, function (Handler, state) {

  React.render(
    <div id="react-view">
      <AltContainer flux={flux}>
        <Handler {...state} />
      </AltContainer>
    </div>,
    document.body);
});

