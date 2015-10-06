var gulp       = require('gulp')
  , $          = require('gulp-load-plugins')()
  , coffee     = require('coffee-script/register')
  , livescript = require('livescript')
  , sequence   = require('run-sequence')
  , del        = require('del')

gulp.task('livescript', function () {
  return gulp.src('src/livescript/index.ls')
    .pipe($.livescript({ bare: true }))
    .pipe($.rename('index.livescript.js'))
    .pipe(gulp.dest('dist'))
})


gulp.task('coffee', function () {
  return gulp.src('src/coffee/index.coffee')
    .pipe($.coffee({ bare: true }))
    .pipe($.rename('index.coffee.js'))
    .pipe(gulp.dest('dist'))
})

gulp.task('test:livescript', [ 'livescript' ], function () {
  return gulp.src('tests/loader.spec.ls')
    .pipe($.mocha({
      compilers: {
        ls: livescript
      }
    }))
})

gulp.task('test:coffee', [ 'coffee' ], function () {
  return gulp.src('tests/loader.spec.coffee')
    .pipe($.mocha({
      compilers: {
        coffee: coffee
      }
    }))
})

gulp.task('test:js', function () {
  return gulp.src('tests/loader.spec.js')
    .pipe($.mocha())
})

gulp.task('clean', function () {
  return del('dist')
})

gulp.task('test', function () {
  sequence('test:js', 'test:coffee', 'test:livescript')
})

gulp.task('default', [ 'test' ])

