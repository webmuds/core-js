// @ts-check

'use strict'

// A pattern to match: <r:roomId?trueString|falseString>
const MARKER_TAG_REGEXP = /<x:([0-9]+)(?:\?((?:\|\||>>|[^|>\n\r])*)?(?:\|)?((?:>>|[^>\n\r])*)?)?>/gi

export class MapParser {
  /**
   *
   * @param {string} originalMap
   */
  constructor (originalMap) {
    /**
     * The original map to perform marker substitutions on.
     *
     * @type {string}
     */
    this.original = originalMap

    /**
     * The Room ID to place markers on. Can be null (no markers rendered).
     * If -1, renders all markers. Useful to see all markers at once during map creation.
     *
     * @type {?number|string}
     */
    this.roomId = null

    /**
     * The replace function, bound to this instance so it has access to the matching room ID.
     *
     * @type {function}
     */
    this.replaceFn = replaceTags.bind(this)
  }

  /**
   * Returns a rendered string of the map, with the markers properly replaced.
   *
   * @returns {string}
   */
  render () {
    // @ts-ignore - the replaceTags function has a custom signature that TS chokes on
    return this.original.replace(MARKER_TAG_REGEXP, this.replaceFn)
  }
}

/**
 * The replacer function. Will be bound to MapParser instances
 * so they can access the roomId to match against.
 *
 * @param {string} _match - Matched string. Unused but required by String#replace.
 * @param {string} roomId - The Room ID present in the tag.
 * @param {string} trueString - The string to render if the room in the tag matches the room ID in the parser.
 * @param {string} falseString - The string to render if the room in the tag does not match the room ID in the parser.
 *
 * @this {MapParser}
 * @returns {string}
 */
function replaceTags (_match, roomId, trueString = null, falseString = null) {
  var matched
  var roomIdToMatch = this.roomId

  if (roomIdToMatch === -1) {
    matched = true // Show all markers
  } else if (roomIdToMatch == null) {
    matched = false // Show no markers
  } else {
    matched = ('' + roomIdToMatch) === roomId
  }

  if (matched) {
    if (trueString == null) {
      trueString = 'X'
    } else {
      trueString = trueString.replace('||', '|').replace('>>', '>')
    }
    return trueString
  }

  if (falseString == null) {
    falseString = ' '
  } else {
    falseString = falseString.replace('>>', '>')
  }

  return falseString
}
