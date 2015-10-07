# Hullo from gulp-load-subtasks!
[![Build Status](https://travis-ci.org/skorlir/gulp-load-subtasks.svg?branch=v1.0.0)](https://travis-ci.org/skorlir/gulp-load-subtasks)

### How to install:
```js
npm i --save-dev gulp-load-subtasks
```

### Basics

In its simplest form, gulp-load-subtasks can be passed a directory and a gulp singleton
and it will find all files matching '\*\*/\*.tasks.js' - that is, any filename ending
with '.tasks.js' in the given directory.

You can pass optional additional arguments that will be passed on to all subtask functions,
such as a plugin object from gulp-load-plugins.

gulp-load-subtasks can also be used to load Coffeescript and LiveScript tasks.

To use the Coffeescript loader, use `require('gulp-load-subtasks/coffee')` instead of
`require('gulp-load-subtasks')`.
Likewise for LiveScript - use `require('gulp-load-subtasks/livescript')` instead of
`require('gulp-load-subtasks')`.

### How to use:

Write all your gulp tasks in a directory like `tasks` and use `gulp-load-subtasks`
to load them into your gulpfile.

#### Example

_Directory structure:_

```
+ gulpfile.js
|
+ tasks/
  + a.tasks.js
  + b.tasks.js
```

_tasks/a.tasks.js:_

```js
module.exports = function (gulp) {
  gulp.task('subtaskA', function () {
    // do things... A
  })
}
```

_tasks/b.tasks.js_

```js
module.exports = function (gulp) {
  gulp.task('subtaskB', function () {
    // do things... B
  })
}
```

_gulpfile.js:_

```js
var gulp = require('gulp')

require('gulp-load-subtasks')('tasks', gulp) // by default looks for tasks/**/*.tasks.js
// OR path can be a glob
require('gulp-load-subtasks')('tasks/**/*.js', gulp)

gulp.task('default', [ 'subtaskA', 'subtaskB' ])
```

### API

#### `subtaskLoader(dir, gulp[, optionalArgs...])`

If dir is a directory, look in dir for files matching '\*\*/\*.tasks.js'.
If it is a glob, get the files it matches.
Then require those files, calling them with the equivalent of `require(f).apply(null, [gulp, optionalArg1, ...])`
