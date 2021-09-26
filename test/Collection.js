// @ts-check

'use strict'

import { expect, sinon } from '@dimensionalpocket/development'
import { Collection } from '../src/Collection.js'

import $logger from '../config/logger.js'

describe('Collection', function () {
  before(function () {
    sinon.stub($logger, 'log')
  })

  after(function () {
    // @ts-ignore
    $logger.log.restore()
  })

  describe('#add', function () {
    context('with an object with an id', function () {
      before(function () {
        this.collection = new Collection()
        this.object = { id: 123, name: 'abc' }
        this.result = this.collection.add(this.object)
      })

      it('returns true', function () {
        expect(this.result).to.equal(true)
      })

      it('adds object to collection', function () {
        expect(this.collection.get(123)).to.equal(this.object)
      })
    })

    context('with an object with an id that already exists in collection', function () {
      before(function () {
        this.collection = new Collection()
        this.object1 = { id: 123, name: 'abc' }
        this.object2 = { id: 123, name: 'def' }
        this.collection.add(this.object1)
        this.result = this.collection.add(this.object2)
      })

      it('returns false', function () {
        expect(this.result).to.equal(false)
      })

      it('does not add object to collection', function () {
        expect(this.collection.values()).to.not.contain(this.object2)
      })
    })

    context('with an object without an id', function () {
      before(function () {
        this.collection = new Collection()
        this.object = { name: 'abc' }
        this.result = this.collection.add(this.object)
      })

      it('returns false', function () {
        expect(this.result).to.equal(false)
      })

      it('does not add object to collection', function () {
        expect(this.collection.values()).to.not.contain(this.object)
      })

      it('logs the error', function () {
        expect($logger.log).to.have.been.calledWith('error', 'Collection', '#add() called with invalid object', this.object)
      })
    })
  })
})
