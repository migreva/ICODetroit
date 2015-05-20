var $ = require('jquery-browserify');
var velocity = require('velocity-animate');
var skrollr = require('skrollr');
var base = require('./include/base');

$(function() {
	var s = skrollr.init();

	/** Animate the opening title page */
	$("#top").velocity({ opacity: 1 }, {
		easing: "ease-in",
		complete: function(elements) {
			$(".menu-item").each(function(i) {
				var $item = $(this);
				setTimeout(function() {
					$item.velocity({ opacity: 1 }, {
						easing: "ease-in"
					});
				}, 1000 * (i + 1))
			});
		}
	});
});
