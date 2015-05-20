var $ = require('jquery-browserify');

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


  $(".ico-btn.animation").hover(
    /** handlerin */
    function(e) {
      var $el = $(this);
      $el.removeClass("jelly-animation-out").addClass("jelly-animation");
    },
    function(e) {
      var $el = $(this);
      $el.removeClass("jelly-animation").addClass("jelly-animation-out");
    }
  );
});