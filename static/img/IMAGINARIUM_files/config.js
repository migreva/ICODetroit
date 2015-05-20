requirejs.config({
	baseUrl: "/static",
	shim: {
		jquery: {
			exports: "jQuery"
		},
		"velocity": ["jquery"],
		"bootstrap": ["jquery"]
	},
	paths: {
		"base": "/static/js/src/include/base",
		"framework": "/static/js/src/include/framework",
		"suspend": "/static/bower_components/suspend.js/suspend",
		"jquery": "/static/bower_components/jquery/dist/jquery.min",
		"velocity": "/static/bower_components/velocity/velocity.min",
		"bootstrap": "/static/bower_components/bootstrap/dist/js/bootstrap.min",
		"skrollr": "/static/bower_components/skrollr/dist/skrollr.min"
	}
});