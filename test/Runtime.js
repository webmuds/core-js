// @ts-check

'use strict'

import { expect } from '@dimensionalpocket/development'
import { Runtime } from '../src/Runtime.js'
import { Resource } from '../src/Resource.js'
import { ApiClient } from '@webmuds/api-client/src/ApiClient.js'

// Shared examples
import { itBehavesLikeARuntime } from './shared/it-behaves-like-a-runtime.js'

const api = new ApiClient()

describe('Runtime', function () {
  before(function () {
    this.resource = new Resource(123, 'resources', api)
  })

  describe('shared behavior', function () {
    before(function () {
      this.runtime = new Runtime(this.resource)
    })

    itBehavesLikeARuntime()
  })

  describe('constructor', function () {
    it('sets the resource', function () {
      var runtime = new Runtime(this.resource)
      expect(runtime.resource).to.equal(this.resource)
    })

    it('sets a namespace if given', function () {
      var runtime = new Runtime(this.resource, 'MyRuntime')
      expect(runtime.namespace).to.equal('MyRuntime')
    })

    it('sets a default namespace if none is given', function () {
      var runtime = new Runtime(this.resource)
      expect(runtime.namespace).to.equal(`Runtime[${this.resource.namespace}]`)
    })

    it('raises an error when resource argument is not a Resource instance', function () {
      // @ts-ignore
      expect(_ => new Runtime({})).to.throw(/resource argument is not a Resource instance/)
    })
  })
})
