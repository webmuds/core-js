// @ts-check

'use strict'

import $logger from '../config/logger.js'

/**
 * @template {Resource} ResourceType
 *
 * Base runtime class.
 */
export class Runtime {
  /**
   * @param {ResourceType} resource - Resource this Runtime is attached to.
   * @param {string} [namespace] - Runtime namespace, defined by subclasses.
   */
  constructor (resource, namespace) {
    if (!resource?._isResource) { throw new Error('[Runtime] resource argument is not a Resource instance') }

    /**
     * Resource this Runtime is attached to.
     * Subclasses can determine the Resource subclass by using `extends`.
     * @type {ResourceType}
     */
    this.resource = resource

    /**
     * Namespace. Can be used as a readable global identifier.
     * @type {string}
     */
    this.namespace = namespace || `Runtime[${resource.namespace}]`

    /**
     * Utility flag for performance.
     * @constant
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
    $logger.log(level, this.namespace, ...args)
  }
}

/**
 * @typedef { import("./Resource").Resource } Resource
 */
