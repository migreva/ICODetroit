var Page = require('../lib/page');

module.exports = function(app) {
  var page = Page(app, {
    template: 'contact',
    url: '/contact'
  })
}