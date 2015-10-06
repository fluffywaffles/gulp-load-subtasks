module.exports = function (gulp, $) {
  //console.log(gulp)
  //console.log($)
  //console.log([].slice.call(arguments, 2))
  //console.log('hullo from gulp-subtask-loader')
  gulp.task('test')
  gulp.passedArgs = {}
  gulp.passedArgs.test = [].slice.call(arguments, 1)
}

