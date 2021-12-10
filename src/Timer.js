import DpTimer from '@dimensionalpocket/timer'

var nextId = 0

export class Timer extends DpTimer {
  constructor (options = null) {
    super(options)

    this.id = options?.id || `Timer${++nextId}`
  }
}
