// @ts-check

'use strict'

// ---------------------------------------------------------------
// TODO - move to own package (dimensionalpocket/game-cooldown-js)
// ---------------------------------------------------------------

/**
 * A Cooldown instance represents the time it takes for a skill to recharge.
 * The cooldown speed can be modified while it's running.
 */
export class Cooldown {
  /**
   * The original timestamp of when the cooldown started.
   * @type {number}
   */
  startTimestamp = 0

  /**
   * Duration in milliseconds.
   * @type {number}
   */
  duration = 0

  /**
   * Modifies the speed of the cooldown. This is used to calculate remaining time.
   * Default is 1.0 (unmodified speed). Higher modifier means faster speed.
   * @type {number}
   */
  modifier = 1.0

  /**
   * The timestamp of when the modifier last changed.
   * This is used to calculate remaining time.
   * @type {number}
   */
  modifyTimestamp = 0

  /**
   * Starts the cooldown, giving it a start time and duration.
   * @param {number} duration - Duration in milliseconds.
   * @param {number} [ts] - Timestamp to start from.
   */
  start (duration, ts = null) {
    var now = ts || Date.now()
    this.startTimestamp = now
    this.modifyTimestamp = now
    this.duration = duration
    this.modifier = 1.0
  }

  /**
   * Applies a speed modifier, changing the remaining time of the cooldown.
   * If the cooldown already ended under the previous modifier,
   * then the new modifier is ignored, and the cooldown is cleared.
   * @param {number} modifier - A float to speed up remaining time. The highest the fastest.
   * @param {number} [ts] - Timestamp to apply modifier (optional).
   * @return {boolean} `true` if the modifier was applied successfully.
   */
  modify (modifier, ts = null) {
    if (modifier <= 0) {
      return false
    }
    if (!this.isActive(ts)) {
      return false
    }
    this.modifyTimestamp = ts || Date.now()
    this.modifier = modifier
    return true
  }

  /**
   * @param {number} [ts]
   * @return {boolean}
   */
  isActive (ts = null) {
    if (this.remaining(ts) <= 0) {
      this.clear()
      return false
    }
    return true
  }

  /**
   * @param {number} [ts]
   * @return {number}
   */
  remaining (ts = null) {
    var lastChange = this.modifyTimestamp
    if (lastChange === 0) {
      return 0
    }
    var now = ts || Date.now()
    return (now - lastChange) / this.modifier
  }

  /**
   * Clears the cooldown, resetting all values.
   * @return {void}
   */
  clear () {
    this.startTimestamp = 0
    this.modifyTimestamp = 0
    this.duration = 0
    this.modifier = 1.0
  }
}
