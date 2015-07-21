'use strict';

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _Promise = require('babel-runtime/core-js/promise')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _config = require('../../config');

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var Blogger = (function () {
  function Blogger(app) {
    _classCallCheck(this, Blogger);

    this.cache = undefined;
    this.apiRoot = 'https://www.googleapis.com/blogger/v3/';
    this.api = {
      posts: {
        url: 'blogs/' + _config.blogger.blogId + '/posts',
        urlParams: {
          maxResults: 10
        }
      }
    };
    this.timeout = 1000 * 60 * 60; // 1 hour

    this.setRoutes(app);

    this.bloggerLoop();
  }

  _createClass(Blogger, [{
    key: 'setRoutes',
    value: function setRoutes(app) {
      var _this = this;

      if (!app) return;

      this.router = (0, _express2['default'])();

      this.router.get('/blog/getPosts/', function callee$2$0(req, res) {
        var articles;
        return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
          while (1) switch (context$3$0.prev = context$3$0.next) {
            case 0:
              if (this.cache) res.json(this.cache);

              articles = undefined;
              context$3$0.prev = 2;
              context$3$0.next = 5;
              return _regeneratorRuntime.awrap(this.fetchArticles());

            case 5:
              articles = context$3$0.sent;

              res.json(articles);
              context$3$0.next = 12;
              break;

            case 9:
              context$3$0.prev = 9;
              context$3$0.t0 = context$3$0['catch'](2);

              res.status(500).json(context$3$0.t0);

            case 12:
            case 'end':
              return context$3$0.stop();
          }
        }, null, _this, [[2, 9]]);
      });

      app.use(this.router);
    }
  }, {
    key: 'bloggerLoop',
    value: function bloggerLoop() {
      return _regeneratorRuntime.async(function bloggerLoop$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            context$2$0.prev = 0;
            context$2$0.next = 3;
            return _regeneratorRuntime.awrap(this.fetchArticles());

          case 3:
            this.cache = context$2$0.sent;
            context$2$0.next = 9;
            break;

          case 6:
            context$2$0.prev = 6;
            context$2$0.t0 = context$2$0['catch'](0);

            console.error(context$2$0.t0);

          case 9:

            setTimeout(this.bloggerLoop.call(this), this.timeout);

          case 10:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this, [[0, 6]]);
    }
  }, {
    key: 'fetchArticles',
    value: function fetchArticles() {
      var _this2 = this;

      return new _Promise(function (resolve, reject) {

        var url = _this2.getUrl('posts');
        _request2['default'].get(url, function (err, resp, body) {
          if (err) reject(err);

          resolve(JSON.parse(body));
        });
      });
    }
  }, {
    key: 'getUrl',
    value: function getUrl(path) {
      if (!(path in this.api)) throw Error('Path ' + path + ' not found');
      var api = this.api[path];

      var urlParams = 'key=' + _config.blogger.apiKey + '&';
      if (urlParams in api.urlParams) {
        for (var param in api.urlParams) {
          urlParams += param + '=' + api.urlParams[param] + '&';
        }
      }
      urlParams = urlParams.slice(0, -1);

      return '' + this.apiRoot + api.url + '?' + urlParams;
    }
  }]);

  return Blogger;
})();

exports['default'] = Blogger;
module.exports = exports['default'];

// await articles = this.fetchArticles();