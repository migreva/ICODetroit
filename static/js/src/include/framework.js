var $ = require('jquery-browserify');
var velocity = require('velocity-animate');

$(function() {
  // WHAT
  function setTimeoutTimeout(fn, delay, timeout) {

    var timeoutId;

    setTimeout(function() {
      if (timeoutId) {
        clearInterval(timeoutId);
      }

      timeoutId = setTimeout(fn, delay);
    });
  }

  /* Navbar */
  $('.nav-menu-toggle').on('click', function() {
    var $navMenu = $('.nav-menu');
    var $navItems = $('.nav-item-container');
    var height = 1;
    var callback = function() {};

    if ($navMenu.hasClass('show')) {
      callback = function() {
        $navMenu.removeClass('show');
      }
    }
    else {
      height += $navItems.outerHeight() * $navItems.length;
      $('.nav-menu').toggleClass('show');
    }

    $navMenu.velocity({
      height: height
    }, callback)
  });
  /* End navbar */

  /* Buttons */
  $('.ico-btn.animation').hover(
    /** handlerin */
    function(e) {
      var $el = $(this);
      $el.removeClass('jelly-animation-out').addClass('jelly-animation');
    },
    function(e) {
      var $el = $(this);
      $el.removeClass('jelly-animation').addClass('jelly-animation-out');
    }
  );
  /* End Buttons */
});