loader = require './loader-common'

module.exports = loadSubtasks = (subtaskGlob) ->
  args  = [].slice.call arguments, 1

  files = loader.load subtaskGlob

  for f in files
    (require f).apply null, [ loader.__gulp__, args... ]
