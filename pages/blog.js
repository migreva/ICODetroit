var Page = require('../lib/page');

module.exports = function(app) {
  var page = Page(app, {
    url: '/blog',
    template: 'blog'
  });

  return {

  }
}