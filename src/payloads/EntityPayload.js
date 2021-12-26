// @ts-check

'use strict'

import { Payload } from '../Payload.js'

export class EntityPayload extends Payload {
  /**
   * Entity Name.
   * @type {string}
   */
  n = null

  /**
   * Entity Description, shown to other players on look.
   * @type {string}
   */
  d = null

  /**
   * Owner Type.
   * @type {string}
   */
  t = null

  /**
   * Owner ID.
   * @type {number}
   */
  o = null

  /**
   * Area ID the entity is currently at (for players),
   * or where the NPC spawns.
   * @type {number}
   */
  a = null

  /**
   * Room ID the entity is currently at (for players),
   * or where the NPC spawns.
   * @type {number}
   */
  r = null
}
