// @ts-check

'use strict'

import EventEmitter from 'eventemitter3'
import { TimerCollection } from './collections/TimerCollection.js'

import $logger from '../config/logger.js'

/**
 * @template {Resource} ResourceType
 *
 * Base runtime class.
 */
export class Runtime extends EventEmitter {
  /**
   * @param {ResourceType} resource - Resource this Runtime is attached to.
   * @param {string} [namespace] - Runtime namespace, defined by subclasses.
   */
  constructor (resource, namespace) {
    if (!resource?._isResource) { throw new Error('[Runtime] resource argument is not a Resource instance') }

    super()

    /**
     * Resource this Runtime is attached to.
     * Subclasses can determine the Resource subclass by using `extends`.
     * @type {ResourceType}
     */
    this.resource = resource
    resource.on('downloaded', this.onResourceDownload, this)
    resource.on('patched', this.onResourcePatch, this)

    /**
     * Namespace. Can be used as a readable global identifier.
     * @type {string}
     */
    this.namespace = namespace || `Runtime[${resource.namespace}]`

    /**
     * A collection of timers for running Runtime tasks.
     * @type {TimerCollection}
     */
    this.timers = new TimerCollection()

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
   * Called when the resource is downloaded.
   * @param {ResourceType} resource
   * @param {object} _data - Downloaded data
   * @param {number} duration - Duration in milliseconds.
   */
  onResourceDownload (resource, _data, duration) {
    resource.log('info', '> GET in', duration, 'ms')
  }

  /**
   * Called when the resource is patched.
   * @param {ResourceType} resource
   * @param {object} _data - Object returned from the API.
   * @param {number} duration - Duration in milliseconds.
   */
  onResourcePatch (resource, _data, duration) {
    resource.log('info', '> PATCH in', duration, 'ms')
  }

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
