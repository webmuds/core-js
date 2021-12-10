import { TimerCollection } from '../collections/TimerCollection.js'

/**
 * Adds a `timers` property to a class.
 * @mixin
 */
export const WithTimers = {
  timers: new TimerCollection()
}
