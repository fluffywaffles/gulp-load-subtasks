require! {
  './loader-common': loader
}

module.exports = load-subtasks = (subtask-glob) !->
  args  = [ ...arguments ].slice 1

  files = loader.load subtask-glob

  for f in files
    (require f).apply null, [ loader.__gulp__, ...args ]

