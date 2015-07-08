import fs      from 'fs';
import path    from 'path';
import express from 'express';
import React        from 'react';
import Router       from 'react-router';
import routes       from './shared/routes';
import proxy        from 'express-http-proxy';
import Flux         from 'myAlt';
import AltContainer from 'alt/AltContainer';

const BUNDLE_PATH = path.join(__dirname, 'dist', 'bundle.js');
const API_URL     = 'http://localhost:8888';

const app = express();

app.get('/bundle.js', (req, res) => {
  fs.createReadStream(BUNDLE_PATH).pipe(res);
});

app.use('/api', proxy(API_URL));

app.use(function (req, res, next) {
  const routePath = req.path;
  const flux      = new Flux();

  Router.run(routes, routePath, function (Handler, state) {
    let html = React.renderToString(
        <div id="react-view">
          <AltContainer flux={flux}>
            <Handler {...state} />
          </AltContainer>
        </div>
    );

    res.end(html);
    next();
  });
});

export default app;
