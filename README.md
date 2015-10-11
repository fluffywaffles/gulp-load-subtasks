# Hullo from Gulp Load Subtasks!
[![Build Status](https://travis-ci.org/skorlir/gulp-load-subtasks.svg?branch=master)](https://travis-ci.org/skorlir/gulp-load-subtasks)

### What is this and why?

You know when you have a really long gulpfile how it gets to be impossible to
keep track of all your tasks and who requires what and it's just a mess?

Imagine if you could break that up into grouped task files like test.tasks.js
and build.tasks.js.

Wouldn't that be nice?

If you'd like that, you're in luck, because _that's_ that Gulp Load Subtasks
does!

:tada: **Easy, not-so-ugly, auto-loaded subtasks!** :tada:

### How to install:
```js
npm i --save-dev gulp-load-subtasks
```

### Alternatives and Comparison:
* [gulp-hub](https://github.com/frankwallis/gulp-hub)
  * Multiple gulpfiles, not multiple modules
  * No globbing (?)
  * No coffee/livescript support (?)
  * Lets you have multiples of the same task and will run them all together
  * **Intention**: run Gulp tasks from multiple projects at once
* [require-dir](https://github.com/aseemk/requireDir)
  * No globbing
  * Requires the directory's modules into an object
  * No coffee/livescript support  (?)
  * **Intention**: ability to require a directory into any Node environment
* **gulp-load-subtasks** (You are here!)
  * Supports globbing
  * Opinionated
  * Fully supports coffee/livescript tasks, gulpfiles
  * Works with and is heavily inspired by
    [gulp-load-plugins](https://github.com/jackfranklin/gulp-load-plugins)
  * **Intention**: ability to import sets of related tasks into any Gulp
    environment

### Basics

In its simplest form, gulp-load-subtasks can be passed some directory (dir) and it will find all files matching 'dir/\*\*/\*.tasks.js' and load those tasks. Here's that example in code:

```js
require('gulp-load-subtasks')('dir')
```

You can pass optional additional arguments that will be passed on to all subtask functions,
such as a plugin object from gulp-load-plugins.

You can also access `loadSubtasks` from your gulp-load-plugins object!

Example using gulp-load-subtasks:

```js
var gulp = require('gulp')
  , $    = require('gulp-load-plugins')()

// pass the plugins along so that your tasks can use them
$.loadSubtasks('dir', $)
```

You can also use gulp-load-subtasks with CoffeeScript and LiveScript!

Just change your require statement to

```coffee
# for coffeescript
(require 'gulp-load-subtasks/coffee')('dir')
```

```ls
# for livescript
(require 'gulp-load-subtasks/livescript')('dir')
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
module.exports = function (gulp, $) {
  gulp.task('subtaskB', function () {
    // do things... B
    // use plugins!
    gulp.src('*.sass')
      .pipe($.sass())
      .pipe(gulp.dest('sassy-css-goes-here'))
  })
}
```

_gulpfile.js:_

```js
var gulp = require('gulp')
  , $    = require('gulp-load-plugins')()

$.loadSubtasks('tasks')
// OR path can be a glob
$.loadSubtasks('tasks/**/*.js')
// Pass in your plugins
$.loadSubtasks('tasks', $)
// Actually pass whatever you want, gulp can chug it /badpun
$.loadSubtasks('tasks', $, "hi mom", { a: "b" }, ...)

// You can now refer to the tasks defined in a.tasks.js and b.tasks.js!
gulp.task('default', [ 'subtaskA1', 'subtaskB' ])
```

### Possible Future Plans

* multiglob support
* loader.\_\_gulp\_\_ delegator (I know there's a name for a design pattern for
  this, but I can't think of it - basically a fake Gulp that captures and
  logs/processes calls to Gulp methods before passing them on, and possibly also
  logs/processes the result before returning.)
* integration with kilowatt [in-progress generator/cli]

