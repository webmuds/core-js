import { Collection } from '../Collection.js'
import { TimerWithId } from '../TimerWithId.js'

export class TimerCollection extends Collection {
  create (timerId) {
    var timer = new TimerWithId(timerId)
    this.add(timer)
  }

  stop () {
    this.forEach(this.stopOne)
  }

  stopOne (timer) {
    timer.stop()
  }
}
