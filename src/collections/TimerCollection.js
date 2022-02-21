// @ts-check

'use strict'

import { Collection } from '../Collection.js'
import { Timer } from '../Timer.js'

/**
 * A collection of timers.
 * @extends Collection<string,Timer>
 */
export class TimerCollection extends Collection {
  /**
   * Creates and returns a Timer instance.
   *
   * @param {object} options
   * @returns {Timer}
   */
  create (options) {
    var timer = new Timer(options)
    this.add(timer)

    return timer
  }

  start () {
    this.forEach(this.startOne)
  }

  startOne (timer) {
    timer.start()
  }

  stop () {
    this.forEach(this.stopOne)
  }

  stopOne (timer) {
    timer.stop()
  }

  dispose () {
    this.forEach(this.disposeOne, this)
  }

  disposeOne (timer) {
    timer.dispose()
    this.delete(timer.id)
  }
}
