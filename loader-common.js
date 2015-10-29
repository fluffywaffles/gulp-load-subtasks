var glob = require('glob')
  , path = require('path')
  , fs   = require('fs')
  , pathEndsWith = require('path-ends-with')

function getGlobFiles (subtaskGlob) {
  return glob.sync(subtaskGlob).filter(function (f) {
    return !fs.lstatSync(f).isDirectory()
  })
}

function defaultFiles (subtaskGlob) {
  var defaultGlobPath = path.join(
    subtaskGlob,
    '**/*.tasks.js'
  )
  return glob.sync(defaultGlobPath)
}

function globFilesOrDefault (subtaskGlob) {
  var files = getGlobFiles(subtaskGlob)

  var noFiles = files.length == 0
    , globIsDir = noFiles && fs.lstatSync(subtaskGlob).isDirectory()

  if (globIsDir)
    files = defaultFiles(subtaskGlob)

  return files
}

function processTaskFiles (files) {
  return files.map(function (f) {
    var ext  = path.extname(f)
      , name = path.basename(f, ext)

    if (pathEndsWith(f, '.tasks' + ext))
      name = path.basename(f, '.tasks')

    return path.resolve(f)
  })
}

// NOTE: 'singleton' pattern; fine for a development lib
var loader = module.exports

// NOTE: this is ONLY FOR TESTING
loader.__gulp__     = require('gulp')
loader.__set_gulp__ = function (g) {
  loader.__gulp__ = g
}

loader.load = function (subtaskGlob) {
   var files = globFilesOrDefault(subtaskGlob)
   return processTaskFiles(files)
}
