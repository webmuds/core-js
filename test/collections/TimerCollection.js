// @ts-check

'use strict'

import { expect } from '@dimensionalpocket/development'
import { TimerCollection } from '../../src/collections/TimerCollection.js'
import { Timer } from '../../src/Timer.js'

describe('collections/TimerCollection', function () {
  describe('#create', function () {
    before(function () {
      this.collection = new TimerCollection()
      this.timer = this.collection.create({ id: 'timerId' })
    })

    it('creates the timer', function () {
      expect(this.timer).to.be.an.instanceof(Timer)
    })

    it('adds the timer to the collection', function () {
      expect(this.collection.get('timerId')).to.eq(this.timer)
    })
  })
})
