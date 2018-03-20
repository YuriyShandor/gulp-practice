const gulp = require('gulp');
const rename = require("gulp-rename");
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify-es').default;

// Logs Message
gulp.task('message', () => {
  return console.log("Gulp is running");
});

// Copy all HTML files
gulp.task('copyHTML', () => {
  gulp.src('src/*.html')
      .pipe(gulp.dest('dist'))
});

//Optimize images
gulp.task('imageMin', () =>
	gulp.src('src/img/*')
		  .pipe(imagemin())
		  .pipe(gulp.dest('dist/img'))
);

// Optimize js-files
gulp.task('jsMin', () => {
  gulp.src('src/js/*.js')
      .pipe(rename({
        suffix: '.min'
      }))
      .pipe(uglify())
      .pipe(gulp.dest('dist/js'))
});
