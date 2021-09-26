// @ts-check

'use strict'

import { expect } from '@dimensionalpocket/development'
import { Resource } from '../src/Resource.js'
import { Payload } from '../src/Payload.js'
import { ApiClient } from '@webmuds/api-client/src/ApiClient.js'

import ApiMock from '@webmuds/api-mock'
import mud1 from '@webmuds/api-mock/data/samples/muds/1.js'

// Shared examples
import { itBehavesLikeAResource } from './shared/it-behaves-like-a-resource.js'

const $api = new ApiClient('http://webmuds.test')

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

  describe('#download', function () {
    before(function () {
      this.apiMock = new ApiMock('http://webmuds.test')
      this.apiMock.start()
      this.resource = new Resource(1, 'muds', $api)
    })

    after(function () {
      this.apiMock.stop()
    })

    it('downloads data from API', async function () {
      var data = await this.resource.download()
      expect(data.id).to.eq(mud1.id)
      expect(data.name).to.eq(mud1.name)
    })
  })
})
