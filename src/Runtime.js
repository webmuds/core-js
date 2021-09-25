// @ts-check

'use strict'

/**
 * Base runtime class.
 */
export class Runtime {
  /**
   * Resource this Runtime is attached to.
   * @type {Resource}
   */
  resource = null

  /**
   * Namespace. Can be used as a readable global identifier.
   * @type {string}
   */
  namespace = null

  /**
   * Utility flag for performance.
   * @constant
   * @type {boolean}
   */
  _isRuntime = true

  /**
   * @param {Resource} resource - Resource this Runtime is attached to.
   * @param {string} [namespace] - Runtime namespace, defined by subclasses.
   */
  constructor (resource, namespace) {
    if (!resource?._isResource) { throw new Error('[Runtime] resource argument is not a Resource instance') }

    this.resource = resource
    this.namespace = namespace || `Runtime[${resource.namespace}]`
  }

  /**
   * Returns the resource ID.
   * @return {number}
   */
  get id () { return this.resource?.id }
}

/**
 * @typedef { import("./Resource").Resource } Resource
 */
