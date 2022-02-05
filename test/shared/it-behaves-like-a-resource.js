// @ts-check

'use strict'

import { expect } from '@dimensionalpocket/development'

/**
 * Requires `this.resource` to be set.
 */
export function itBehavesLikeAResource () {
  describe('constructor', function () {
    it('initializes ID and api', function () {
      expect(this.resource.id).to.exist
      expect(this.resource.api).to.exist
    })
  })

  describe('#id=', function () {
    before(function () {
      this.oldId = this.resource.id
      this.resource.id = 789
    })

    after(function () {
      this.resource.id = this.oldId
    })

    it('sets the ID in the payload', function () {
      expect(this.resource.payload.id).to.equal(789)
    })
  })

  describe('#id', function () {
    before(function () {
      this.oldId = this.resource.id
      this.resource.payload.id = 789
    })

    after(function () {
      this.resource.payload.id = this.oldId
    })

    it('returns the ID from the payload', function () {
      expect(this.resource.id).to.equal(789)
    })
  })

  describe('#hydrate', function () {
    before(function () {
      this.oldId = this.resource.id
      this.resource.hydrate({ id: 789 })
    })

    after(function () {
      this.resource.id = this.oldId
    })

    it('updates the ID', function () {
      expect(this.resource.id).to.equal(789)
    })
  })
}
