import Router from 'express';
import Blogger from '../lib/blogger';

let router = Router();

let init = function(app) {
  /* Basic HTML Routes */
  router.get('/', function(req, res) {
    res.render('index', {
      title: 'Home - ICO Detroit'
    });
  });

  router.get('/projects', function(req, res) {
    res.render('projects', {
      title: 'Projects'
    });
  });

  router.get('/calendar/', function(req, res) {
    res.render('calendar', {
      title: 'Calendar'
    });
  });

  router.get('/contact/', function(req, res) {
    res.render('contact', {
      title: 'Contact'
    });
  });

  router.get('/blog/', function(req, res) {
    res.render('blog', {
      title: 'Blog'
    });
  });

  router.get('/get-involved/', function(req, res) {
    res.render('get-involved', {
      title: 'Get Involved'
    });
  });

  router.get('/about/', function(req, res) {
    res.render('about', {
      title: 'about'
    });
  })

  app.use(router);

  /* Blogger stuff */
  let b = new Blogger(app);
}

module.exports = {
  init
}
