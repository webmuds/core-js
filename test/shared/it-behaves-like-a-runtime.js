import { expect } from '@dimensionalpocket/development'

/**
 * Requires `this.runtime` to be set.
 */
export function itBehavesLikeARuntime () {
  describe('#id', function () {
    it('returns the resource ID', function () {
      expect(this.runtime.id).to.equal(this.runtime.resource.id)
    })
  })
}
