// @ts-check

'use strict'

import { Payload } from '../Payload.js'

export class RoomPayload extends Payload {
  /**
   * Area ID this Room belongs to.
   * @type {number}
   */
  a = null

  /**
   * Room name.
   * @type {string}
   */
  n = null

  /**
   * Room description, when players enter rooms or type `look`.
   * @type {string}
   */
  d = null

  /**
   * Array of Exit IDs.
   * @type {Array<number>}
   */
  e = []
}
