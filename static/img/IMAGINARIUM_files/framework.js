define(["jquery", "suspend"], function($) {


	$(".ico-btn").hover(

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