// @ts-check

'use strict'

import { Payload } from '../Payload.js'

export class CharacterPayload extends Payload {
  /**
   * Character Name.
   * @type {string}
   */
  n = null

  /**
   * Character description, shown to other players when they `look <character>`.
   * @type {string}
   */
  d = null

  /**
   * Entity ID.
   * @type {number}
   */
  ent = null
}
