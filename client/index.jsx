import React  from 'react';
import Router from 'react-router';
import routes from '../shared/routes';

// Load styles
require('normalize.css/normalize');
require('./sass/app');

Router.run(routes, function (Handler, state) {
  React.render(
    <Handler {...state} />,
    document.body
  );
});

