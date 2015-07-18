import express             from 'express';
import React               from 'react';
import { Router }          from 'react-router';
import Location            from 'react-router/lib/Location';
import axios               from 'axios';
import createRoutes        from './shared/routes';
import proxy               from 'express-http-proxy';
import { Provider }        from 'react-redux';
import * as reducers       from 'reducers';
import promiseMiddleware   from 'lib/promiseMiddleware';
import fetchComponentData  from 'lib/fetchComponentData';
import { createStore,
         combineReducers,
         applyMiddleware } from 'redux';

const API_URL = 'http://localhost:8888';

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

app.use('/favicon.ico', function (req, res) {
  res.status(404).end('No.');
});

// Pass everything else through react-router
app.use(function (req, res) {
  const location = new Location(req.path, req.query);
  const reducer  = combineReducers(reducers);
  const store    = applyMiddleware(promiseMiddleware)(createStore)(reducer);

  const routes = createRoutes();

  Router.run(routes, location, function (routeErr, initialState) {
    if(routeErr) return console.error(routeErr);

    function renderView() {
      const InitialView = (
        <Provider store={store}>
          {() =>
            <Router {...initialState} />
          }
        </Provider>
      );

      const routerHTML = React.renderToString(InitialView);

      const initialData = store.getState();

      return `
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
    }

    if(initialState)
      fetchComponentData(store.dispatch, initialState.components, initialState.params)
        .then(renderView)
        .then(html => res.end(html))
        .catch(err => res.end(err.message));
  });
});

export default app;
