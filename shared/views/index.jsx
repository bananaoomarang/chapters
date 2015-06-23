import React  from 'react';
import Router from 'react-router';
import routes from '../routes';

export default function () {

  Router.run(routes, function (Handler) {

    React.render(<Handler />, document.getElementById('react-view'));

  });

}
