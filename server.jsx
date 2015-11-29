import path                      from 'path';
import express                   from 'express';
import React                     from 'react';
import { renderToString }        from 'react-dom/server'
import { RoutingContext, match } from 'react-router';
import axios                     from 'axios';
import createRoutes              from './shared/routes';
import proxy                     from 'express-http-proxy';
import { Provider }              from 'react-redux';
import * as reducers             from 'reducers';
import promiseMiddleware         from 'lib/promiseMiddleware';
import fetchComponentData        from 'lib/fetchComponentData';
import FourOhFour                from 'components/404';
import { createStore,
         combineReducers,
         applyMiddleware }       from 'redux';

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
app.use(express.static(path.join(__dirname, 'public')));

const routes = createRoutes(function (nextState, transition, done) { done(); });

// Pass everything else through react-router
app.use(function (req, res) {
  const reducer  = combineReducers(reducers);
  const store    = applyMiddleware(promiseMiddleware)(createStore)(reducer);

  match({ routes, location: req.url }, (routeErr, redirectLocation, renderProps) => {
    if(routeErr) {
      console.error(routeErr);

      return res
        .status(500)
        .end('Internal server error.')
    }

    if(!renderProps)
      return res
        .status(404)
        .end(renderToString(<FourOhFour />));

    function renderView() {
      const InitialView = (
        <Provider store={store}>
          <RoutingContext {...renderProps} />
        </Provider>
      );

      const routerHTML = renderToString(InitialView);

      const initialData = store.getState();

      return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">

          <title>Chapters</title>

          <script type="application/javascript">
            window.__INITIAL_DATA__ = ${JSON.stringify(initialData)};
        </script>
        </head>
        <body>
          <div id="react-view">${routerHTML}</div>
        </body>
      </html>
      `;
    }

    fetchComponentData(store.dispatch, renderProps.components, renderProps.params)
      .then(renderView)
      .then(html => res.end(html))
      .catch(e => {
        console.error(e);

        res
          .status(500)
          .end('Could not render route.')
      });
  });
});

export default app;
