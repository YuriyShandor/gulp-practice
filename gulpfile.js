'use strict';

const gulp = require('gulp');
const rename = require("gulp-rename");
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify-es').default;
const babel = require('gulp-babel');
const sass = require('gulp-sass');
const watch = require('gulp-watch');
const browserSync = require('browser-sync').create();

// Logs Message
gulp.task('message', () => {
  return console.log("Gulp is running");
});

// // Copy all HTML files
// gulp.task('copyHTML', () => {
//   gulp.src('src/*.html')
//       .pipe(gulp.dest('dist'))
// });
//
// // Copy all fonts files
// gulp.task('copyFonts', () => {
//   gulp.src('src/fonts/*')
//       .pipe(gulp.dest('dist/fonts'))
// });

//Optimize images
gulp.task('imageMin', () =>
	gulp.src('src/img/*')
		  .pipe(imagemin())
		  .pipe(gulp.dest('img'))
);

// Optimize js-files
gulp.task('jsCompile', () => {
  gulp.src('src/js/*.js')
      .pipe(babel({
            presets: ['env']
        }))
      .pipe(gulp.dest('js'))
});

// .pipe(rename({
//   suffix: '.min'
// }))
// .pipe(uglify())

// SASS Compilation
gulp.task('sassCompile', () => {
  gulp.src('src/scss/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('css'))
      .pipe(browserSync.stream());
});

// Start All Comands
gulp.task('build', ['imageMin', 'jsCompile', 'sassCompile']);


// Gulp Watching
gulp.task('watch', () => {
  gulp.watch('src/img/*', ['imageMin']);
  gulp.watch('src/js/*.js', ['jsCompile']);
  gulp.watch('src/scss/*.scss', ['sassCompile']);
});

// gulp.watch('src/*.html', ['copyHTML']);
// gulp.watch('src/fonts/*', ['copyFonts']);

gulp.task('startServer', ['build'], () => {
  browserSync.init({
    server: {
      baseDir: "./"
    },
    scrollProportionally: true,
    notify: false,
    open: "local"
  })
  gulp.watch('src/img/*', ['imageMin']);
  gulp.watch('src/js/*.js', ['jsCompile']);
  gulp.watch('src/scss/*.scss', ['sassCompile']);
  gulp.watch('*.html').on('change', browserSync.reload);
  gulp.watch('js/*.js', browserSync.reload);
});
