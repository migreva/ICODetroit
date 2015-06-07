var gulp = require('gulp');
var gutil = require('gulp-util');
var browserify = require('browserify');
var _ = require('lodash');
var watch = require('gulp-watch');
var batch = require('gulp-batch');
var sass = require('gulp-sass');
var source = require('vinyl-source-stream');
var sourcemaps = require('gulp-sourcemaps');
var buffer = require('vinyl-buffer');

// Constants
var STATIC = {
  root: './static/',
  srcRoot: './static/src',
  distRoot: './static/dist',
}

// SASS/CSS File paths
var cssRoot = STATIC.root + '/css/src';
var cssDist = STATIC.root + '/css/dist';
var sassFiles = cssRoot + '/**/*.scss';

// JS File paths
var jsRoot = STATIC.root + '/js/src';
var jsDist = STATIC.root + '/js/dist';
var jsFiles = jsRoot + '/**/*.js';
var jsSrcFiles = ['index.js', 'about.js', 'ico.js', 'blog.js', 'contact.js'];

gulp.task('sass', function () {
  gulp.src(sassFiles)
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.init())
      // .pipe(uglify())
      // .on('error', gutil.log)
    .pipe(sourcemaps.write('./', {
      // includeContent: true,
      sourceRoot: '/src',
      sourceMappingURLPrefix: '/dist/js/'

    }))
    .pipe(gulp.dest(cssDist));
});

gulp.task('js', function() {
  _.forEach(jsSrcFiles, function(file) {
    bundlejs(file);
  });
  return;
});

function bundlejs(file) {
  var b = browserify(jsRoot + '/' + file, {
    debug: true,
    shim: {
      jQuery: {
          path: 'public/js/jquery.min.js',
          exports: '$'
      }
    }
  });

  return b.bundle()
          .pipe(source(file))
          .pipe(buffer())
          .pipe(sourcemaps.init({
            loadMaps: true
          }))
            // .pipe(uglify())
            // .on('error', gutil.log)
          .pipe(sourcemaps.write('./', {
            // includeContent: true,
            sourceRoot: '/src',
            sourceMappingURLPrefix: '/dist/js/'

          }))
          .pipe(gulp.dest(jsDist))
          .on('end', function() {
            gutil.log('Browserify finished creating: ' + file);
            if (typeof bcb === 'function') bcb();
          });
}

gulp.task('watch', function() {

  watch(sassFiles, batch(function() {
    gulp.start('sass')
      .pipe(watch(sassFiles));
  }));

  watch(jsFiles, batch(function() {
    gulp.start('js')
      .pipe(watch(jsFiles));
  }));
});