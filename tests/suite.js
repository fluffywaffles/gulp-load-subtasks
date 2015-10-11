var assert = require('assert')
  , loader = require('../loader-common')

module.exports = function (load) {

  beforeEach(function () {
    loader.__set_gulp__({
      tasks: { },
      task: function (name) {
        loader.__gulp__.tasks[name] = 'added task'
      }
    })
  })

  describe('gulp-subtask-loader', function () {
    it('should expect a dir and require all .tasks.ext files in it', function () {
      load('tests/tasks')
      assert.equal(loader.__gulp__.tasks['test'], 'added task')
    })

    it('should pass along additional args', function () {
      load('tests/tasks', 'optionalArg1', true, 0)
      assert.equal(loader.__gulp__.tasks['test'], 'added task')
      assert.deepEqual(loader.__gulp__.passedArgs['test'], ['optionalArg1', true, 0])
    })

    it('should also accept a glob', function () {
       load('tests/tasks/*.js', 'optionalArg1', 'optionalArg2')
       assert.equal(loader.__gulp__.tasks['test'], 'added task')
       assert.equal(loader.__gulp__.tasks['test-js'], 'added task')
    })
  })
}
