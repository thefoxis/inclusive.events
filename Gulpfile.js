var gulp         = require('gulp'),
    concat       = require('gulp-concat'),
    postcss      = require('gulp-postcss'),
    cssnext      = require('gulp-cssnext'),
    cssnano      = require('cssnano'),
    connect      = require('gulp-connect'),
    simplevars   = require('postcss-simple-vars'),
    cssimport    = require('postcss-import');
 
var srcHTML      = "index.html";
var srcCSS       = "src/*.css";
 
gulp.task('connect', function() {
  connect.server({
    livereload: true
  });
});

gulp.task('css', function(){
  var processors = [
    cssimport(),
    simplevars(),
    cssnext(),
    cssnano()
  ];
  return gulp.src('./src/main.css')
    .pipe(postcss(processors))
    .pipe(gulp.dest('./css/'))
    .pipe(connect.reload());
});
 
gulp.task('html', function () {
  gulp.src(srcHTML)
    .pipe(connect.reload());
});
 
gulp.task('watch', function () {
  gulp.watch(srcHTML, ['html']);
  gulp.watch(srcCSS, ['css']);
});
 
gulp.task('default', ['connect', 'watch']);