import { Collection } from '../Collection.js'
import { Timer } from '../Timer.js'

export class TimerCollection extends Collection {
  /**
   * Creates and returns a Timer instance.
   *
   * @param {object}
   * @returns
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
