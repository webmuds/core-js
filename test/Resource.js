// @ts-check

'use strict'

import { expect } from '@dimensionalpocket/development'
import { Resource } from '../src/Resource.js'
import { Payload } from '../src/Payload.js'
import { ApiClient } from '@webmuds/api-client/src/ApiClient.js'

// Shared examples
import { itBehavesLikeAResource } from './shared/it-behaves-like-a-resource.js'

const $api = new ApiClient()

describe('Resource', function () {
  before(function () {
    this.resource = new Resource(123, 'resources', $api)
  })

  itBehavesLikeAResource()

  describe('constructor', function () {
    it('initializes with correct arguments', function () {
      expect(this.resource.$api).to.equal($api)
      expect(this.resource.path).to.equal('resources')
      expect(this.resource.endpoint).to.equal('resources/123')
    })
  })

  describe('#payload', function () {
    it('is a BasePayload', function () {
      expect(this.resource.payload).to.be.an.instanceof(Payload)
    })
  })
})
