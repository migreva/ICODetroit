'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _expressIo = require('express.io');

var _expressIo2 = _interopRequireDefault(_expressIo);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _routesRouter = require('./routes/router');

var _routesRouter2 = _interopRequireDefault(_routesRouter);

var _routesSockets = require('./routes/sockets');

var _routesSockets2 = _interopRequireDefault(_routesSockets);

var app = (0, _expressIo2['default'])();

// Template language
app.set('views', _path2['default'].join(__dirname, '../views'));
app.set('view engine', 'jade');

// Static file path
console.log(_path2['default'].join(__dirname, '../static'));
app.use(_expressIo2['default']['static'](_path2['default'].join(__dirname, '../static')));

_routesRouter2['default'].init(app);
// sockets.init(app);

if (!_config2['default'].PROD) {
  (function () {
    var server = app.listen(3001, function () {

      var host = server.address().address;
      var port = server.address().port;

      console.log('Example app listening at http://%s:%s', host, port);
    });
  })();
}