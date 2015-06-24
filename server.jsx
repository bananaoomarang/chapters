import fs      from 'fs';
import path    from 'path';
import express from 'express';
import React   from 'react';
import Router  from 'react-router';
import routes  from './shared/routes';
import proxy   from 'express-http-proxy';

const BUNDLE_PATH = path.join(__dirname, 'dist', 'bundle.js');
const API_URL     = 'http://localhost:8888';

const app = express();

app.get('/bundle.js', function (req, res) {
  fs.createReadStream(BUNDLE_PATH).pipe(res);
});

app.use('/api', proxy(API_URL));

app.use(function (req, res, next) {
  const routePath = req.path;

  Router.run(routes, routePath, function (Handler, state) {

    if(state.routes.length) {
      let html = React.renderToString(
        <div id="react-view">
          <Handler {...state} />
        </div>
      );

      res.end(html);

    } else {
      next();
    }
  });
});

export default app;
