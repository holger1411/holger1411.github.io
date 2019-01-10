var gulp = require('gulp')
var autoprefixer = require('gulp-autoprefixer')
var plumber = require('gulp-plumber')
var sass = require('gulp-sass')
var webserver = require('gulp-webserver')

gulp.task('default', ['webserver'], function() {
  gulp.watch('src/css/**/*.scss', ['css'])
})

gulp.task('webserver', function() {
  gulp.src('./').pipe(
    webserver({
      livereload: true,
      directoryListing: false,
      open: false
    })
  )
})

let autoprefixBrowsers = ['last 2 versions', 'IE >= 10']

gulp.task('css', function() {
  gulp
    .src(['src/css/screen.scss'])
    .pipe(
      plumber({
        errorHandler: function(error) {
          console.log(error.message)
          this.emit('end')
        }
      })
    )
    .pipe(sass())
    .pipe(autoprefixer({ browsers: autoprefixBrowsers }))
    .pipe(gulp.dest('assets/css/'))
})
