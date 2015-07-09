import fs              from 'fs';
import path            from 'path';
import express         from 'express';
import React           from 'react';
import Router          from 'react-router';
import routes          from './shared/routes';
import proxy           from 'express-http-proxy';
import { createRedux } from 'redux';
import { Provider }    from 'redux/react';
import * as reducers   from 'reducers';

const BUNDLE_PATH = path.join(__dirname, 'dist', 'bundle.js');
const API_URL     = 'http://localhost:8888';

const app = express();

app.get('/bundle.js', (req, res) => {
  fs.createReadStream(BUNDLE_PATH).pipe(res);
});

app.use('/api', proxy(API_URL));

app.use(function (req, res, next) {
  const routePath = req.path;
  const redux     = createRedux(reducers);

  Router.run(routes, function (Handler, state) {

    const View = (
      <Provider redux={redux}>
        {() =>
          <Handler {...state} />
        }
      </Provider>
    );

    res.end(
      React.renderToString(
        View
      )
    );

    next();

  });
});

export default app;
