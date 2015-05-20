var _ = require('lodash');
var index = require('./index');
var about = require('./about');
var ico = require('./ico');
var blog = require('./blog');
var contact = require('./contact');

var pages = [
  index,
  about,
  ico,
  blog,
  contact
]

module.exports = function(app) {
  _.forEach(pages, function(page) {
    page(app);
  });

  return {

  }
}