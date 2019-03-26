var gulp = require("gulp");
var ts = require("gulp-typescript");
var browserify = require("browserify");
var source = require('vinyl-source-stream');
var tsify = require("tsify");
var paths = {
    pages: ['src/examples/*.html']
};

gulp.task("copy-html", function () {
  return gulp.src(paths.pages)
      .pipe(gulp.dest("dist"));
});

gulp.task("build", ['copy-html'], function () {
  return browserify({
      basedir: '.',
      debug: true,
      entries: ['src/index.ts'],
      cache: {},
      packageCache: {}
  })
  .plugin(tsify)
  .bundle()
  .pipe(source('bundle.js'))
  .pipe(gulp.dest("dist"));
});
