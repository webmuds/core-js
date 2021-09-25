// @ts-check

'use strict'

const LOG_PREFIXES = {
  log: 'I',
  info: 'I',
  warn: 'W',
  debug: 'D',
  error: 'E'
}

var $logger

if (process.env.NODE_ENV !== 'test') {
  // Normal logger for non-test environments.
  $logger = {
    /**
     * @param {string} namespace
     * @param {string} level
     * @param  {...any} args
     */
    namespaced: function (namespace, level, ...args) {
      return $logger.global(level, namespace, ...args)
    },

    /**
     * @param {string} level
     * @param  {...any} args
     */
    global: function (level, ...args) {
      var prefix = LOG_PREFIXES[level]
      // TODO: validate level?
      return console[level](prefix, ...args)
    }
  }
} else {
  // The test logger only adds messages to an array.
  $logger = {
    messages: [],

    /**
     * @param {string} namespace
     * @param {string} level
     * @param  {...any} args
     */
    namespaced: function (namespace, level, ...args) {
      $logger.messages.push([namespace, level, ...args])
    },

    /**
     * @param {string} level
     * @param  {...any} args
     */
    global: function (level, ...args) {
      var prefix = LOG_PREFIXES[level]
      $logger.messages.push([prefix, ...args])
    }
  }
}

Object.freeze($logger)

export default $logger
