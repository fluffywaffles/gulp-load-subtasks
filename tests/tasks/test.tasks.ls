module.exports = (gulp, $) !->
  args = [ ...arguments ].slice 1

  gulp.task \test

  gulp.passedArgs = {}
  gulp.passedArgs.test = args

