require! {
  glob
  path
  fs
  'path-ends-with'
}

module.exports = (subtaskGlob, gulp) !->
  args  = [ ...arguments ].slice 1
  files = [  ]

  files = glob.sync subtaskGlob .filter (f) ->
    (path.extname f) is not ''

  if files.length is 0 and fs.lstatSync subtaskGlob .isDirectory!
    files = glob.sync path.join subtaskGlob, '**/*.tasks.{js,ls}'

  for f in files
    ext  = path.extname f
    name = path.basename f, ext

    if path-ends-with f, '.tasks' + ext
      name = path.basename f, '.tasks'

    f = path.resolve f
    (require f)(...args)

