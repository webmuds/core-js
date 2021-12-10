import { Collection } from '../Collection.js'
import { Timer } from '../Timer.js'

export class TimerCollection extends Collection {
  /**
   * Creates and returns a Timer instance.
   *
   * @param {string} timerId
   * @returns
   */
  create (timerId) {
    var timer = new Timer({ id: timerId })
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
