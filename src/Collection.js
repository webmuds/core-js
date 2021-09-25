// @ts-check

'use strict'

import $logger from '../config/logger.js'

/**
 * A Collection is an opinionated Map instance for objects with an `id` property.
 *
 * @template {any} ObjectID - the value of the `id` property in the object.
 * @template {{id: any} & Object.<string,any>} ObjectInstance - the object being stored. Accepts any object with an `id` property.
 *
 * @extends Map<ObjectID,ObjectInstance>
 */
export class Collection extends Map {
  /**
   * @param {ObjectInstance} object - Object to add (must have an `id` property)
   * @return {boolean} - `true` if object was added to collection.
   */
  add (object) {
    var valid = this.validate(object)

    if (!valid) return false

    this.set(object.id, object)

    return true
  }

  /**
   * @param {object} object - Object to add.
   * @return {boolean} - `true` if object can be added to collection.
   */
  validate (object) {
    if (!object || !object.id) {
      $logger.global('error', this.constructor.name, '#add() called with invalid object', object)
      return false
    }

    var exists = this.get(object.id)

    return !exists
  }
}
