# Hullo from Gulp Load Subtasks!
[![Build Status](https://travis-ci.org/skorlir/gulp-load-subtasks.svg?branch=v1.0.0)](https://travis-ci.org/skorlir/gulp-load-subtasks)

### Why?

You know when you have a really long gulpfile how it gets to be impossible to
keep track of all your tasks and who requires what and it's just a mess?

Imagine if you could break that up into grouped task files like test.tasks.js
and build.tasks.js.

Wouldn't that be nice?

If you'd like that, you're in luck, because _that's_ that Gulp Load Subtasks
does!

### How to install:
```js
npm i --save-dev gulp-load-subtasks
```

### Basics

In its simplest form, gulp-load-subtasks can be passed some directory (dir) and a gulp singleton and it will find all files matching 'dir\*\*/\*.tasks.js' and load those tasks. Here's that example in code:

```js
var gulp = require('gulp')

require('gulp-load-subtasks')('dir', gulp)
```

You can pass optional additional arguments that will be passed on to all subtask functions,
such as a plugin object from gulp-load-plugins.

You can also access `loadSubtasks` from your gulp-load-plugins object!

Example using gulp-load-subtasks:

```js
var gulp = require('gulp')
  , $    = require('gulp-load-plugins')()

$.loadSubtasks(dir, gulp)
```

You can also use gulp-load-subtasks with CoffeeScript and LiveScript!

Just change your require statement to

```js
require('gulp-load-subtasks/coffee') // for coffeescript
require('gulp-load-subtasks/livescript') // for livescript
```

and it will load `dir/**/*.tasks.coffee` or `dir/**/*.tasks.ls` by default
instead.

#### Basic Example (with directory structure)

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
  gulp.task('subtaskA1', function () {
    // do things... A1
  })
  gulp.task('subtaskA2', function () {
    // do things... A2
  })
}
```

_tasks/b.tasks.js_

```js
module.exports = function (gulp, plugins) {
  gulp.task('subtaskB', function () {
    // do things... B
    // You can use plugins!
  })
}
```

_gulpfile.js:_

```js
var gulp = require('gulp')
  , plugins = require('gulp-load-plugins')()

$.loadSubtasks('tasks', gulp, plugins)
// OR path can be a glob
$.loadSubtasks('tasks/**/*.js', gulp, plugins)
// You can pass as many optional parameters as you want
$.loadSubtasks('tasks', gulp, plugins, "hi mom", { a: "b" }, ...)

// You can now refer to the tasks defined in a.tasks.js and b.tasks.js!
gulp.task('default', [ 'subtaskA', 'subtaskB' ])
```

### API

#### `subtaskLoader(dir, gulp[, optionalArgs...])`

If dir is a directory, look in dir for files matching '\*\*/\*.tasks.js'.

If using coffee, replace 'js' with 'coffee' above.
If using livescript, replace 'js' with 'ls' above.

If dir is a glob, get the files it matches (regardless of extension).

Then require those files, calling them with the equivalent of `require(f).apply(null, [gulp, optionalArg1, ...])`

