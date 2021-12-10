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
   * @param {object}
   * @returns {Timer}
   */
  create (options) {
    var timer = new Timer(options)
    this.add(timer)

    return timer
  }

  stop () {
    this.forEach(this.stopOne)
  }

  stopOne (timer) {
    timer.stop()
  }
}