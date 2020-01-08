var gulp       = require('gulp')
  , $          = require('gulp-load-plugins')()
  , coffee     = require('coffee-script/register')
  , livescript = require('livescript')
  , del        = require('del')

gulp.task('livescript', function () {
  return gulp.src('livescript.ls')
    .pipe($.livescript({ bare: true }))
    .pipe($.rename('index.livescript.js'))
    .pipe(gulp.dest('.'))
})


gulp.task('coffee', function () {
  return gulp.src('coffee.coffee')
    .pipe($.coffee({ bare: true }))
    .pipe($.rename('index.coffee.js'))
    .pipe(gulp.dest('.'))
})

gulp.task('test:teardown', function (done) {
  del([ 'index.coffee.js', 'index.livescript.js' ])
  done()
})

gulp.task('test:livescript', gulp.series([ 'livescript' ]), function () {
  return gulp.src('tests/loader.spec.ls')
    .pipe($.mocha({
      compilers: {
        ls: livescript
      }
    }))
})

gulp.task('test:coffee', gulp.series([ 'coffee' ]), function () {
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

gulp.task('test', gulp.series([
  'test:js',
  'test:coffee',
  'test:livescript',
  'test:teardown',
]), function (done) {
  done()
})

gulp.task('default', gulp.series([ 'test' ]), function (done) {
  done()
})
