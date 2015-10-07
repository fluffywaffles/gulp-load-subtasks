glob         = require 'glob'
path         = require 'path'
fs           = require 'fs'
pathEndsWith = require 'path-ends-with'

module.exports = (subtaskGlob, gulp) ->
  args  = [].slice.call arguments, 1
  files = [  ]

  files = glob.sync(subtaskGlob).filter (f) ->
    path.extname(f) != ''

  if files.length is 0 and fs.lstatSync(subtaskGlob).isDirectory()
    files = glob.sync path.join subtaskGlob, '**/*.tasks.coffee'

  for f in files
    ext  = path.extname f
    name = path.basename f, ext

    if pathEndsWith f, '.tasks' + ext
      name = path.basename f, '.tasks'

    f = path.resolve f

    require(f)(args...)

