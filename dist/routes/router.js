'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var router = (0, _express2['default'])();

module.exports = function (app) {
  router.get('/', function (req, res) {
    res.render('index', {
      title: 'Home - ICO Detroit'
    });
  });

  router.get('/projects', function (req, res) {
    res.render('projects', {
      title: 'Projects'
    });
  });

  router.get('/calendar/', function (req, res) {
    res.render('calendar', {
      title: 'Calendar'
    });
  });

  router.get('/contact/', function (req, res) {
    res.render('contact', {
      title: 'Contact'
    });
  });

  router.get('/blog/', function (req, res) {
    res.render('blog', {
      title: 'Blog'
    });
  });

  app.use(router);
};