// @ts-check

'use strict'

import EventEmitter from 'eventemitter3'
import { RequestError } from './errors/RequestError.js'
import { Payload } from './Payload.js'

import $logger from '../config/logger.js'

/**
 * Base Resource class.
 */
export class Resource extends EventEmitter {
  /**
   * @param {number} id
   * @param {string} path
   * @param {ApiClient} $api
   * @param {object} [payload] - Payload instance to use, defaults to base Payload instance
   */
  constructor (id, path, $api, payload = null) {
    if (!id) { throw new Error('[Resource] ID not provided') }
    if (!path) { throw new Error('[Resource] path not provided') }
    if (!$api) { throw new Error('[Resource] API instance not provided') }

    super()

    /**
     * Shareable payload for this resource.
     * Key names are shorthand versions of property names.
     * @type {object}
     */
    this.payload = payload || new Payload()
    this.id = id // Will set the ID in the Payload

    /**
     * Resource path from API without the ID, used to generate the endpoint.
     * E.g., "muds", "muds/1/characters", etc
     * @type {string}
     */
    this.path = path

    /**
     * External API client (provided by @webmuds/api-client).
     * @type {ApiClient}
     */
    this.$api = $api

    /**
     * API endpoint (path + ID, e.g., "/muds/1", "/muds/1/characters/2", etc).
     * Generated in the constructor. Subclasses can extend the constructor to customize this value.
     * @type {string}
     */
    this.endpoint = `${this.path}/${this.id}`

    /**
     * Utility flag for performance.
     * @readonly
     * @type {boolean}
     */
    this._isResource = true

    /**
     * Namespace. Can be used as a readable global identifier.
     * @type {string}
     */
    this.namespace = `Resource:/${this.endpoint}`
  }

  /**
   * Resource ID from API.
   * @param {number} value
   * @return {void}
   */
  set id (value) { this.payload.id = value }

  /**
   * @return {number}
   */
  get id () { return this.payload.id }

  /**
   * Downloads data from API and stores in memory.
   * @return {Promise<boolean>}
   */
  async load () {
    var data = await this.download()
    this.hydrate(data)
    return true
  }

  /**
   * Downloads data from API and returns it.
   * On success, emits 'downloaded' with resource, downloaded data, and download duration.
   * @return {Promise<object>}
   */
  async download () {
    var start = Date.now()
    var responseData

    try {
      responseData = await this.$api.get(this.endpoint)
    } catch (e) {
      this.log('error', e, this)
      throw new RequestError(e)
    }

    this.emit('downloaded', this, responseData, Date.now() - start)

    return responseData
  }

  /**
   * Fills this instance with data.
   * Subclasses should extend this method mapping API fields to instance properties.
   * @param {object} data
   * @return {void}
   */
  hydrate (data) {
    if (data.id !== undefined) this.id = data.id
  }

  /**
   * Patches the API resource and returns the response.
   * Emits 'patched' with resource, response from API call, and request duration.
   * @param {object} data
   * @return {Promise<object>}
   */
  async patch (data) {
    var start = Date.now()
    var responseData

    try {
      responseData = await this.$api.patch(this.endpoint, data)
    } catch (e) {
      this.log('error', e, this)
      throw new RequestError(e)
    }

    this.emit('patched', this, responseData, Date.now() - start)

    return responseData
  }

  /**
   * @param {string} level
   * @param  {...any} args
   */
  log (level, ...args) {
    this.emit('log', level, this.namespace, ...args)
  }
}

/**
 * @typedef { import('@webmuds/api-client/src/ApiClient').ApiClient } ApiClient
 */
