// @ts-check

'use strict'

import { Payload } from '../Payload.js'

export class MudPayload extends Payload {
  /**
   * MUD name.
   * @type {string}
   */
  n = null

  /**
   * Message of the Day.
   * @type {string}
   */
  motd = null

  /**
   * Server ID.
   * @type {number}
   */
  svr = null

  /**
   * Startint Area ID.
   * @type {number}
   */
  a = null

  /**
   * Mud Online status.
   * @type {boolean}
   */
  o = null
}
