import { TimerCollection } from '../collections/TimerCollection.js'

export const WithTimers = (superclass) => class extends superclass {
  constructor () {
    super(...arguments)

    this.timers = new TimerCollection()
  }
}
