// @ts-check

'use strict'

import { expect } from '@dimensionalpocket/development'
import { TimerCollection } from '../../src/collections/TimerCollection.js'
import { WithTimers } from '../../src/mixins/WithTimers.js'

class TestWtParentClass {
  methodFromParent () { return 'parent' }
}

class TestWtChildClass extends WithTimers(TestWtParentClass) {}

describe('mixins/WithTimers', function () {
  before(function () {
    this.object = new TestWtChildClass()
  })

  it('extends from parent class', function () {
    expect(this.object.methodFromParent()).to.eq('parent')
  })

  it('implements timers collection', function () {
    expect(this.object.timers).to.be.an.instanceof(TimerCollection)
  })
})
