// @ts-check

'use strict'

export class RequestError extends Error {
  constructor (axiosError) {
    super('Request Error')
    var config = axiosError.config || {}
    this.name = 'RequestError'
    this.code = axiosError.code
    this.method = config.method
    this.url = `${config.baseURL}/${config.url}`
    this.body = axiosError.response && axiosError.response.body
    this.stack = axiosError.stack
  }
}
