var assert = require('assert')
  , load   = require('..')

var gulpMock

beforeEach(function () {
  gulpMock = {
    tasks: { },
    task: function (name) {
      gulpMock.tasks[name] = 'added task'
    }
  }
})

describe('gulp-subtask-loader', function () {
  it('should expect a dir and require all .task.* files in it', function () {
    load('tests/tasks', gulpMock)
    assert.equal(gulpMock.tasks['test'], 'added task')
    assert.equal(gulpMock.tasks['test-coffee'], 'added task')
  })

  it('should pass along additional args', function () {
    load('tests/tasks', gulpMock, 'optionalArg1', true, 0)
    assert.equal(gulpMock.tasks['test'], 'added task')
    assert.deepEqual(gulpMock.passedArgs['test'], ['optionalArg1', true, 0])
  })

  it('should also accept a glob', function () {
     load('tests/tasks/*.js', gulpMock, 'optionalArg1', 'optionalArg2')
     assert.equal(gulpMock.tasks['test'], 'added task')
     assert.equal(gulpMock.tasks['test-js'], 'added task')
  })
})

