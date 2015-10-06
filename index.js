var glob = require('glob')
  , path = require('path')
  , fs   = require('fs')
  , pathEndsWith = require('path-ends-with')

module.exports = function (subtaskGlob, gulp) {
  var args  = [].slice.call(arguments, 1)
    , files = [ ]

  files = glob.sync(subtaskGlob).filter(function (f) {
    return path.extname(f) != ''
  })

  if (files.length == 0 && fs.lstatSync(subtaskGlob).isDirectory())
    files = glob.sync(path.join(subtaskGlob, '**/*.tasks.js'))

  files.forEach(function (f) {
    var ext  = path.extname(f)
      , name = path.basename(f, ext)
    if (pathEndsWith(f, '.tasks' + ext))
      name = path.basename(f, '.tasks')
    f = path.resolve(f)
    require(f).apply(null, args)
  })
}
