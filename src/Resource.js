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
   * Resource path from API, used to generate the endpoint.
   * Defined by subclasses.
   * E.g., "muds"
   * @type {string}
   */
  path = null

  /**
   * API endpoint (path + endpoint, e.g., "/muds/1").
   * Generated in the constructor. Subclasses can extend the constructor to customize this value.
   * @type {string}
   */
  endpoint = null

  /**
   * Shareable resource data is stored here.
   * Key names are shorthand versions of property names.
   * This object gets sent around between server/clients/workers.
   * @type {object}
   */
  payload = null

  /**
   * External API client (provided by @webmuds/api-client).
   * @type {ApiClient}
   */
  $api = null

  /**
   * Log namespace.
   * @type {string}
   */
  namespace = null

  /**
   * Utility flag for performance.
   * @constant
   * @type {boolean}
   */
  _isResource = true

  /**
   * @param {number} id
   * @param {string} path
   * @param {ApiClient} $api
   * @param {object} [payload] - Payload instance to use, defaults to base Payload instance
   */
  constructor (id, path, $api, payload = null) {
    super()

    if (!id) { throw new Error('[Resource] ID not provided') }
    if (!path) { throw new Error('[Resource] path not provided') }
    if (!$api) { throw new Error('[Resource] API instance not provided') }

    // Payload must be set before setting the ID.
    this.payload = payload || new Payload()
    this.id = id

    this.path = path
    this.endpoint = `${this.path}/${this.id}`
    this.$api = $api

    this.namespace = `Resource<${this.path}>#${this.id}`
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
   * @return {Promise<object>}
   */
  async download () {
    try {
      var start = Date.now()
      var response = await this.$api.get(this.endpoint)
      $logger.namespaced(this.namespace, 'debug', '>', 'Downloaded in', Date.now() - start, 'ms')
    } catch (e) {
      throw new RequestError(e)
    }

    return response.data
  }

  /**
   * Fills this instance with data.
   * Subclasses should extend this method
   * mapping API fields to instance properties.
   * @param {object} data
   * @return {void}
   */
  hydrate (data) {
    if (data.id !== undefined) this.id = data.id
  }

  /**
   * Patches the API resource and returns the response.
   * @param {object} data
   * @return {Promise<object>}
   */
  async patch (data) {
    var start = Date.now()
    var response
    try {
      response = await this.$api.patch(this.endpoint, data)
    } catch (e) {
      throw new RequestError(e)
    }

    $logger.namespaced(this.namespace, 'debug', '>', 'Patched in', Date.now() - start, 'ms', data)

    return response.data
  }

  /**
   * @param {string} message
   * @param {string} level
   */
  log (message, level = 'log') {
    return $logger.namespaced(this.namespace, level, '>', message)
  }
}

/**
 * @typedef { import('@webmuds/api-client/src/ApiClient').ApiClient } ApiClient
 */
