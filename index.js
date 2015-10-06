var glob = require('glob')
  , path = require('path')
  , fs   = require('fs')
  , pathEndsWith = require('path-ends-with')

module.exports = function (subtaskGlob, gulp) {
  var args  = [ gulp ].concat([].slice.call(arguments, 2))
    , files = [ ]

  files = glob.sync(subtaskGlob).filter(function (f) {
    return path.extname(f) != ''
  })

  if (files.length == 0 && fs.lstatSync(subtaskGlob).isDirectory())
    files = glob.sync(path.join(subtaskGlob, '**/*.task.*'))

  files.forEach(function (f) {
    var ext  = path.extname(f)
      , name = path.basename(f, ext)
    if (pathEndsWith(f, '.task' + ext))
      name = path.basename(f, '.task')
    f = path.resolve(f)
    require(f).apply(null, args)
  })
}
