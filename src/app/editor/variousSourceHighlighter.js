'use strict'
var SourceHighlighter = require('./sourceHighlighter')
module.exports = class VariousSourceHighlighter {

    constructor () {
      this.highlighters = {}
    }

    pluginDescription () {
      return {
        title: 'sourcehighlighter',
        displayName: 'sourcehighlighter',
        icon: null,
        methods: ['highlight', 'discardHighlight'],
        notifications: []
      }
    }

    // TODO what to do with mod?
    highlight (mod, lineColumnPos, filePath, hexColor, cb) {
      var position
      try {
        position = JSON.parse(lineColumnPos)
      } catch (e) {
        return cb(e.message)
      }
      if (!highlighters[mod]) highlighters[mod] = new SourceHighlighter()
      highlighters[mod].currentSourceLocation(null)
      highlighters[mod].currentSourceLocationFromfileName(position, filePath, hexColor)
      cb()
    }

    discardHighlight (mod, cb) {
      if (highlighters[mod]) highlighters[mod].currentSourceLocation(null)
      cb()
    }
}
