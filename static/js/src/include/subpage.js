var base = require('./base');
var $ = require('jquery-browserify');
var velocity  = require('velocity-animate');

$(function() {
  /* Event handlers */
  $('.subnav').on('click', '.ico-btn', function(e) {
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();

    // Toggle button states
    $('.subnav .ico-btn.active').removeClass('active');
    $(this).addClass('active');

    var href = $(this).attr('href');
    if (!$(href).length) return;

    // Fade out currently-shown page
    $('.content .content-section.active').velocity({opacity: 0}, function(elements) {
      $(elements).removeClass('active');

      $(href).addClass('active').velocity({opacity: 1});
    });
  });

});



