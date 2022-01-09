// @ts-check

'use strict'

import EventEmitter from 'eventemitter3'
import { TimerCollection } from './collections/TimerCollection.js'

/**
 * @template {Resource} R - Resource class this runtime handles.
 *
 * Base runtime class.
 */
export class Runtime extends EventEmitter {
  /**
   * @param {R} resource - Resource this Runtime is attached to.
   * @param {string} [namespace] - Runtime namespace, defined by subclasses.
   */
  constructor (resource, namespace = null) {
    if (!resource?._isResource) { throw new Error('[Runtime] resource argument is not a Resource instance') }

    super()

    /**
     * Resource this Runtime is attached to.
     * Subclasses can determine the Resource subclass by using `extends`.
     * @type {R}
     */
    this.resource = resource

    /**
     * Namespace. Can be used as a readable global identifier.
     * @type {string}
     */
    this.namespace = namespace || `Runtime[${resource.namespace}]`

    /**
     * A collection of timers for running Runtime tasks.
     * Subclasses can decide to initialize this property with a TimerCollection.
     * @type {?TimerCollection}
     */
    this.timers = null

    /**
     * Utility flag for performance.
     * @readonly
     * @type {boolean}
     */
    this._isRuntime = true
  }

  /**
   * Returns the resource ID.
   * @return {number}
   */
  get id () { return this.resource?.id }

  /**
   * @param {string} level
   * @param  {...any} args
   */
  log (level, ...args) {
    this.emit('log', level, this.namespace, ...args)
  }
}

/**
 * @typedef { import("./Resource").Resource } Resource
 */
