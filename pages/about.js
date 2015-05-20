var Page = require('../lib/page');

module.exports = function(app) {

  var page = Page(app, {
    url: '/about',
    template: 'about'
  })
  
  return {

  }
}