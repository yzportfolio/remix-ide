
// var async = require('async')
// var $ = require('jquery')
var yo = require('yo-yo')
// var remixLib = require('remix-lib')
// var tooltip = require('../ui/tooltip')

// var styleGuide = require('../ui/styles-guide/theme-chooser')
// var styles = styleGuide.chooser()

var css = require('./styles/file-panel-styles')

// var canUpload = window.File || window.FileReader || window.FileList || window.Blob
// var ghostbar = yo`<div class=${css.ghostbar}></div>`

/*
  Overview of APIs:
   * fileManager: @args fileProviders (browser, shared-folder, swarm, github, etc ...) & config & editor
      - listen on browser & localhost file provider (`fileRenamed` & `fileRemoved`)
      - update the tabs, switchFile
      - trigger `currentFileChanged`
      - set the current file in the config
   * fileProvider: currently browser, swarm, localhost, github, gist
      - link to backend
      - provide properties `type`, `readonly`
      - provide API `resolveDirectory`, `remove`, `exists`, `rename`, `get`, `set`
      - trigger `fileExternallyChanged`, `fileRemoved`, `fileRenamed`, `fileRenamedError`, `fileAdded`
   * file-explorer: treeview @args fileProvider
      - listen on events triggered by fileProvider
      - call fileProvider API
*/

module.exports = class LeftIconPanel {
  constructor () {
  }
  render () {
    return yo`
    <div class=${css.container}>
      <ul>
        <li>
          <i style="size: 24px;" class="fa fa-files-o fa-2x"></i>
        </li>
        <li>
          <i style="size: 24px;" class="fa fa-bug fa-2x"></i>
        </li>
        <li>
          <i style="size: 24px;" class="fa fa-puzzle-piece fa-2x"></i>
        </li>
        <li>
          <i style="size: 24px;" class="fa fa-cog fa-2x"></i>
        </li>
      </ul>
    </div>
    `
  }
}
