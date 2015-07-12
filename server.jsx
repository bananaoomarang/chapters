import express         from 'express';
import React           from 'react';
import { Router }      from 'react-router';
import Location        from 'react-router/lib/Location';
import axios           from 'axios';
import routes          from './shared/routes';
import proxy           from 'express-http-proxy';
import { createRedux } from 'redux';
import { Provider }    from 'redux/react';
import * as reducers   from 'reducers';

const API_URL     = 'http://localhost:8888';

// Prepend all axios requests with API address
axios.interceptors.request.use( (cfg) => {
  cfg.url = API_URL + cfg.url;

  return cfg;
});

const app = express();

// Proxy to API
app.use('/api', proxy(API_URL));

// Serve static assets
app.use('/assets', express.static('assets'));

app.use('/favicon.ico', function (req, res, next) {
  res.status(404).end('No.');
});

// Pass everything else through react-router
app.use(function (req, res, next) {
  const location = new Location(req.path, req.query);
  const redux    = createRedux(reducers);

  Router.run(routes, location, function (err, initialState, transition) {
    if(err) return console.error(err);

    const InitialView = (
      <Provider redux={redux}>
        {() =>
          <Router {...initialState} />
        }
      </Provider>
    );

    const routerHTML = React.renderToString(InitialView);

    const initialData = redux.getState();

    console.log(initialData);

    const HTML = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Chapters</title>

        <script>
          window.__INITIAL_DATA__ = ${JSON.stringify(initialData)};
        </script>
      </head>
      <body>
        <div id="react-view">${routerHTML}</div>
      </body>
    </html>
    `;

    res.end(HTML);

    next();

  });
});

export default app;
