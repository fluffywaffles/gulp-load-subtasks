# Hullo from gulp-subtask-loader!
[![Build Status](https://travis-ci.org/skorlir/gulp-subtask-loader.svg?branch=master)](https://travis-ci.org/skorlir/gulp-subtask-loader)

### How to install:
```js
npm i --save-dev gulp-subtask-loader
```

### Basics

In its simplest form, gulp-subtask loader can be passed a directory and a gulp singleton
and it will find all files matching '\*\*/\*.tasks.\*' - that is, any filename with any
extension, so long as its "secondary" extension is 'tasks'.

You can pass optional additional arguments that will be passed on to all subtask functions,
such as a plugin object from gulp-load-plugins.

### How to use:
```js
// tasks/subtasksAAndB.tasks.js

module.exports = function (gulp) {
  gulp.task('subtaskA', function () {
    // do things... A
  })

  gulp.task('subtaskB', function () {
    // do things... B
  })
}
```
```js
//gulpfile.js

var gulp = require('gulp')

require('gulp-subtask-loader')('tasks', gulp) // by default looks for tasks/**/*.tasks.*
// OR path can be a glob (not actually sure if this will work with coffee files, tbh)
require('gulp-subtask-loader')('tasks/**/*.coffee')

gulp.task('default', [ 'subtaskA', 'subtaskB' ])
```

### API

#### `subtaskLoader(dir, gulp[, optionalArgs...])`

If dir is a directory, look in dir for files matching '\*\*/\*.tasks.\*'.
If it is a glob, get the files it matches.
Then require those files, calling them with the equivalent of `require(f).apply(null, [gulp, optionalArg1, ...])`
