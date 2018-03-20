const gulp = require('gulp');
const rename = require("gulp-rename");
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify-es').default;
const babel = require('gulp-babel');
const sass = require('gulp-sass');

// Logs Message
gulp.task('message', () => {
  return console.log("Gulp is running");
});

// Copy all HTML files
gulp.task('copyHTML', () => {
  gulp.src('src/*.html')
      .pipe(gulp.dest('dist'))
});

// Copy all fonts files
gulp.task('copyFonts', () => {
  gulp.src('src/fonts/*')
      .pipe(gulp.dest('dist/fonts'))
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
      .pipe(babel({
            presets: ['env']
        }))
      .pipe(uglify())
      .pipe(gulp.dest('dist/js'))
});

// SASS Compilation
gulp.task('sassCompile', () => {
  gulp.src('src/scss/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('dist/css'))
});

// Start All Comands
gulp.task('default', ['copyHTML', 'imageMin', 'jsMin', 'sassCompile']);

// Gulp Watching
gulp.task('watch', () => {
  gulp.watch('src/*.html', ['copyHTML']);
  gulp.watch('src/*.html', ['copyHTML']);
});
