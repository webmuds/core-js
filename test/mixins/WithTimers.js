// @ts-check

'use strict'

import { expect } from '@dimensionalpocket/development'
import { TimerCollection } from '../../src/collections/TimerCollection.js'
import { WithTimers } from '../../src/mixins/WithTimers.js'

class TestWtClass {}
Object.assign(TestWtClass.prototype, WithTimers)

describe('mixins/WithTimers', function () {
  before(function () {
    this.object = new TestWtClass()
  })

  it('implements timers collection', function () {
    expect(this.object.timers).to.be.an.instanceof(TimerCollection)
  })
})
