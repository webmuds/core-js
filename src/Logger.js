// @ts-check

'use strict'

const LOG_PREFIXES = {
  log: 'I',
  info: 'I',
  warn: 'W',
  debug: 'D',
  error: 'E'
}

export class Logger {
  info () {
    return this.log('info', ...arguments)
  }

  warn () {
    return this.log('warn', ...arguments)
  }

  error () {
    return this.log('error', ...arguments)
  }

  debug () {
    return this.log('debug', ...arguments)
  }

  /**
   * @param {string} level - log, info, warn, error, or debug
   * @param  {...any} args
   * @returns
   */
  log (level, ...args) {
    var prefix = LOG_PREFIXES[level]
    // TODO: validate level?
    return console[level](prefix, ...args)
  }
}
