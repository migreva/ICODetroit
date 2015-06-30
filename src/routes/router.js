import Router from 'express';

let router = Router();

module.exports = function(app) {
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

  app.use(router);
}