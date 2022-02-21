// @ts-check

'use strict'

import { Payload } from '../Payload.js'

export class AreaPayload extends Payload {
  /**
   * Area name.
   * @type {string}
   */
  n = null

  /**
   * Area description, shown when players enter `examine area`.
   * @type {string}
   */
  d = null

  /**
   * Area map.
   * @type {string}
   */
  m = null
}
