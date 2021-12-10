import Timer from '@dimensionalpocket/timer'

var nextId = 0

export class TimerWithId extends Timer {
  constructor (options = null) {
    super(options)

    this.id = options?.id || `Timer${++nextId}`
  }
}
