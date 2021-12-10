import DpTimer from '@dimensionalpocket/timer'

var nextId = 0

/**
 * @extends DpTimer
 */
export class Timer extends DpTimer {
  constructor (options = null) {
    super(options)

    /**
     * @type {string}
     */
    this.id = options?.id || `Timer${++nextId}`
  }

  // TODO: move to original package
  dispose () {
    this.stop()
    this.removeAllListeners()
  }
}
