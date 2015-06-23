var fs            = require('fs');
var path          = require('path');
var express       = require('express');
var React         = require('react');
var Router        = require('react-router');
var routes        = require('./shared/routes');
var proxy         = require('express-http-proxy');
var app           = express();

const BUNDLE_PATH = path.join(__dirname, 'dist', 'bundle.js');
const API_URL     = 'http://localhost:8888';

app.get('/bundle.js', function (req, res) {
  fs.createReadStream(BUNDLE_PATH).pipe(res);
});

app.use(function (req, res, next) {
  const routePath = req.path;

  Router.run(routes, routePath, function (Handler, state) {

    if(Handler) {
      let View = (
        <Handler {...state} />
      );

      let html = React.renderToString(View);

      res.end(html);

    } else {
      next();
    }
  });
});

app.use(proxy(API_URL));

module.exports = app;
