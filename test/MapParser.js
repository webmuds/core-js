// @ts-check

'use strict'

import { expect } from '@dimensionalpocket/development'
import { MapParser } from '../src/MapParser.js'

describe('MapParser', function () {
  context('when custom strings are not present', function () {
    before(function () {
      this.parser = new MapParser('[<x:1>]-[<x:2>]-[<x:3>]')
    })

    context('when room ID matches a marker', function () {
      it('renders the marker in the correct position', function () {
        this.parser.roomId = 1
        expect(this.parser.render()).to.eq('[X]-[ ]-[ ]')
        this.parser.roomId = 2
        expect(this.parser.render()).to.eq('[ ]-[X]-[ ]')
        this.parser.roomId = 3
        expect(this.parser.render()).to.eq('[ ]-[ ]-[X]')
      })
    })

    context('when room ID is -1', function () {
      it('shows all markers at once', function () {
        this.parser.roomId = -1
        expect(this.parser.render()).to.eq('[X]-[X]-[X]')
      })
    })

    context('when room ID is null', function () {
      it('shows unmatching markers', function () {
        this.parser.roomId = null
        expect(this.parser.render()).to.eq('[ ]-[ ]-[ ]')
      })
    })
  })

  context('when string for matching is present', function () {
    before(function () {
      this.parser = new MapParser('[<x:1?You>]-[<x:2?Are>]-[<x:3?Here>]')
    })

    context('when room ID matches a marker', function () {
      it('renders the marker in the correct position', function () {
        this.parser.roomId = 1
        expect(this.parser.render()).to.eq('[You]-[ ]-[ ]')
        this.parser.roomId = 2
        expect(this.parser.render()).to.eq('[ ]-[Are]-[ ]')
        this.parser.roomId = 3
        expect(this.parser.render()).to.eq('[ ]-[ ]-[Here]')
      })
    })

    context('when room ID is -1', function () {
      it('shows all markers at once', function () {
        this.parser.roomId = -1
        expect(this.parser.render()).to.eq('[You]-[Are]-[Here]')
      })
    })

    context('when room ID is null', function () {
      it('shows unmatching markers', function () {
        this.parser.roomId = null
        expect(this.parser.render()).to.eq('[ ]-[ ]-[ ]')
      })
    })
  })

  context('when both string for matching and non-matching is present', function () {
    before(function () {
      this.parser = new MapParser('[<x:1?Yes|No>]-[<x:2?Yes|No>]-[<x:3?Yes|No>]')
    })

    context('when room ID matches a marker', function () {
      it('renders the marker in the correct position', function () {
        this.parser.roomId = 1
        expect(this.parser.render()).to.eq('[Yes]-[No]-[No]')
        this.parser.roomId = 2
        expect(this.parser.render()).to.eq('[No]-[Yes]-[No]')
        this.parser.roomId = 3
        expect(this.parser.render()).to.eq('[No]-[No]-[Yes]')
      })
    })

    context('when room ID is -1', function () {
      it('shows all markers at once', function () {
        this.parser.roomId = -1
        expect(this.parser.render()).to.eq('[Yes]-[Yes]-[Yes]')
      })
    })

    context('when room ID is null', function () {
      it('shows unmatching markers', function () {
        this.parser.roomId = null
        expect(this.parser.render()).to.eq('[No]-[No]-[No]')
      })
    })
  })
})
