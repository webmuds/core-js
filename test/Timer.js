// @ts-check

'use strict'

import { expect, sinon } from '@dimensionalpocket/development'
import { Timer } from '../src/Timer.js'

describe('Timer', function () {
  before(function () {
    this.clock = sinon.useFakeTimers()
    this.timer = new Timer({ id: 'abc', duration: 5000 })
  })

  after(function () {
    this.clock.restore()
  })

  it('has an id', function () {
    expect(this.timer.id).to.eq('abc')
  })

  it('is a Timer', function () {
    expect(this.timer._duration).to.eq(5000)
  })

  context('when an id is not provided', function () {
    it('uses an automatic ID', function () {
      var timer = new Timer()
      expect(timer.id).to.eq('Timer1')
    })
  })
})
