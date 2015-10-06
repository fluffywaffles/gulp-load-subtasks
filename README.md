# Hullo from gulp-load-subtasks!
[![Build Status](https://travis-ci.org/skorlir/gulp-load-subtasks.svg?branch=v1.0.0)](https://travis-ci.org/skorlir/gulp-load-subtasks)

### How to install:
```js
npm i --save-dev gulp-load-subtasks
```

### Basics

In its simplest form, gulp-load-subtasks can be passed a directory and a gulp singleton
and it will find all files matching '\*\*/\*.tasks.\*' - that is, any filename with any
extension, so long as its "secondary" extension is 'tasks'.

You can pass optional additional arguments that will be passed on to all subtask functions,
such as a plugin object from gulp-load-plugins.

To use the coffee loader, `require('gulp-load-subtasks/coffee')`. Likewise for LiveScript.

Coffee and LiveScript loaders will also load .js tasks.

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

require('gulp-load-subtasks')('tasks', gulp) // by default looks for tasks/**/*.tasks.*
// OR path can be a glob
require('gulp-load-subtasks/coffee')('tasks/**/*.coffee', gulp)
// Can also load livescript tasks, which will by default include js tasks as well
require('gulp-load-subtasks/livescript')('tasks', gulp)

gulp.task('default', [ 'subtaskA', 'subtaskB' ])
```

### API

#### `subtaskLoader(dir, gulp[, optionalArgs...])`

If dir is a directory, look in dir for files matching '\*\*/\*.tasks.\*'.
If it is a glob, get the files it matches.
Then require those files, calling them with the equivalent of `require(f).apply(null, [gulp, optionalArg1, ...])`
