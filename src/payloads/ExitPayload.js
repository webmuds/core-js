// @ts-check

'use strict'

import { Payload } from '../Payload.js'

export class ExitPayload extends Payload {
  /**
   * Room ID this Exit belongs to.
   * @type {number}
   */
  r = null

  /**
   * Direction (shorthand string, i.e., "n", "e", etc).
   * @type {string}
   */
  d = null

  /**
   * Destination Room ID (toRoomID).
   * @type {number}
   */
  t = null

  /**
   * Destination Area ID.
   * @type {number}
   */
  a = null
}
