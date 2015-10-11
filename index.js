var loader = require('./loader-common')

module.exports = function loadSubtasks (subtaskGlob) {
  var args  = [].slice.call(arguments, 1)
  args.unshift(loader.__gulp__)

  files = loader.load(subtaskGlob)

  files.forEach(function (f) {
    require(f).apply(null, args)
  })
}

