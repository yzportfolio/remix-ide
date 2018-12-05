const yo = require('yo-yo')
const csjs = require('csjs-inject')
const remixLib = require('remix-lib')

var globalRegistry = require('../../global/registry')

const styleguide = require('../ui/styles-guide/theme-chooser')
const styles = styleguide.chooser()
// const PluginManager = require('../plugin/pluginManager')
// const TabbedMenu = require('../tabs/tabbed-menu')
// const CompileTab = require('../tabs/compile-tab')
// const SettingsTab = require('../tabs/settings-tab')
// const AnalysisTab = require('../tabs/analysis-tab')
// const DebuggerTab = require('../tabs/debugger-tab')
// const SupportTab = require('../tabs/support-tab')
// const PluginTab = require('../tabs/plugin-tab')
// const TestTab = require('../tabs/test-tab')
// const RunTab = require('../tabs/run-tab')
// const DraggableContent = require('../ui/draggableContent')

const EventManager = remixLib.EventManager

// var async = require('async')

// var tooltip = require('../ui/tooltip')

// var styleGuide = require('../ui/styles-guide/theme-chooser')

// var css = require('./styles/file-panel-styles')

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
  constructor (localRegistry) {
    const self = this
    self._components = {}
    self._components.registry = localRegistry || globalRegistry

    self._components.registry.put({api: this, name: 'lefticonpanel'})
    self.event = new EventManager()
    self._view = {
      element: null,
      tabbedMenu: null,
      tabbedMenuViewport: null,
      dragbar: null
    }

    self.plugins = [
      {type: 'fileManager', displayName: 'File Manger', icon: 'fa fa-files-o fa-2x'},
      {type: 'pluginManager', displayName: 'Plugin Manger', icon: 'fa fa-puzzle-piece fa-2x'},
      {type: 'settings', displayName: 'setting', icon: 'fa fa-cog fa-2x'}
    ]
  }

    // self._deps = {
    //   filepanel: self._components.registry.get('filepanel').api,
    //   fileProviders: self._components.registry.get('fileproviders').api,
    //   fileManager: self._components.registry.get('filemanager').api,
    //   compiler: self._components.registry.get('compiler').api,
    //   udapp: self._components.registry.get('udapp').api,
    //   app: self._components.registry.get('app').api,
    //   txlistener: self._components.registry.get('txlistener').api
    // }

    // var tabbedMenu = new TabbedMenu(self._components.registry)

    // var pluginManager = new PluginManager(
    //   self._deps.app,
    //   self._deps.compiler,
    //   self._deps.txlistener,
    //   self._deps.fileProviders,
    //   self._deps.fileManager,
    //   self._deps.udapp
    // )

    // self._components.registry.put({api: pluginManager, name: 'pluginmanager'})

    // var analysisTab = new AnalysisTab(self._components.registry)
    // analysisTab.event.register('newStaticAnaysisWarningMessage', (msg, settings) => { self._components.compile.addWarning(msg, settings) })

    // self._components.debuggerTab = new DebuggerTab(self._components.registry)

    // #####
      // ---------------- FilePanel --------------------
  // self._components.filePanel = new FilePanel()
  // self._view.leftpanel.appendChild(self._components.filePanel.render())
  // self._components.filePanel.event.register('resize', delta => self._adjustLayout('left', delta))
  // registry.put({api: self._components.filePanel, name: 'filepanel'})
// #####

  //   self._components = {
  //     pluginManager: pluginManager,
  //     tabbedMenu: tabbedMenu,
  //     filepanel: self._deps.filepanel,
  //     compile: new CompileTab(self._components.registry),
  //     run: new RunTab(self._components.registry),
  //     settings: new SettingsTab(self._components.registry),
  //     analysis: analysisTab,
  //     debug: self._components.debuggerTab,
  //     support: new SupportTab(self._components.registry),
  //     test: new TestTab(self._components.registry)
  //   }
  //   self._components.settings.event.register('plugin-loadRequest', json => {
  //     self.loadPlugin(json)
  //   })

  //   self.loadPlugin = function (json) {
  //     var modal = new DraggableContent(() => {
  //       self._components.pluginManager.unregister(json)
  //     })
  //     var tab = new PluginTab(json)
  //     var content = tab.render()
  //     document.querySelector('body').appendChild(modal.render(json.title, json.url, content))
  //     self._components.pluginManager.register(json, modal, content)
  //   }
  //   self._view.dragbar = yo`<div id="dragbar" class=${css.dragbar}></div>`

    // self._view.element = yo`
    //   <div id="lefticon-panel" class=${css.lefticonpanel}>
    //     ${self._view.dragbar}
    //     <div id="header" class=${css.header}>
    //       ${self._components.tabbedMenu.render()}
    //       ${self._components.tabbedMenu.renderViewport()}
    //     </div>
    //   </div>`

  //   const { filepanel, compile, run, settings, analysis, debug, support, test } = self._components
  //   self._components.tabbedMenu.addTab('File Explorer', 'fileView', filepanel.render())
  //   self._components.tabbedMenu.addTab('Compile', 'compileView', compile.render())
  //   self._components.tabbedMenu.addTab('Run', 'runView', run.render())
  //   self._components.tabbedMenu.addTab('Analysis', 'staticanalysisView', analysis.render())
  //   self._components.tabbedMenu.addTab('Testing', 'testView', test.render())
  //   self._components.tabbedMenu.addTab('Debugger', 'debugView', debug.render())
  //   self._components.tabbedMenu.addTab('Settings', 'settingsView', settings.render())
  //   self._components.tabbedMenu.addTab('Support', 'supportView', support.render())
  //   self._components.tabbedMenu.selectTabByTitle('Compile')
  // }

  swapPlugin (name) {
    // console.log the plugin that was clicked
    console.log(name)
  }

  render () {
    const self = this
    // if (self._view.element) return self._view.element
    // return self._view.element
    return yo`
    <div class=${css.container}>
      <ul>
      ${self.plugins.map(function (pi) {
        return yo`<li>
          <i onclick=${() => { self.swapPlugin(pi.type) }} style="size: 24px;" class="${pi.icon} ${css.plugin}"></i>
        </li>`
      })
      }
      </ul>
    </div>
    `
  }

  // <i style="size: 24px;" class="fa fa-files-o fa-2x">${pi.pluginName}</i>
  // <div class=${css.container}>
  //     <ul>
  //     // for (let plug of self.plugins) {
  //       <li>
  //         <i style="size: 24px;" class="fa fa-files-o fa-2x">plug.pluginName</i>
  //       </li>

  //     // }
  //     </ul>
  //   </div>

  init () {
    // @TODO: init is for resizable drag bar only and should be refactored in the future
    const self = this
    const limit = 60
    self._view.dragbar.addEventListener('mousedown', mousedown)
    const ghostbar = yo`<div class=${css.ghostbar}></div>`
    function mousedown (event) {
      event.preventDefault()
      if (event.which === 1) {
        moveGhostbar(event)
        document.body.appendChild(ghostbar)
        document.addEventListener('mousemove', moveGhostbar)
        document.addEventListener('mouseup', removeGhostbar)
        document.addEventListener('keydown', cancelGhostbar)
      }
    }
    function cancelGhostbar (event) {
      if (event.keyCode === 27) {
        document.body.removeChild(ghostbar)
        document.removeEventListener('mousemove', moveGhostbar)
        document.removeEventListener('mouseup', removeGhostbar)
        document.removeEventListener('keydown', cancelGhostbar)
      }
    }
    function getPosition (event) {
      const lhp = window['filepanel'].offsetWidth
      const max = document.body.offsetWidth - limit
      var newpos = (event.pageX > max) ? max : event.pageX
      newpos = (newpos > (lhp + limit)) ? newpos : lhp + limit
      return newpos
    }
    function moveGhostbar (event) { // @NOTE VERTICAL ghostbar
      ghostbar.style.left = getPosition(event) + 'px'
    }
    function removeGhostbar (event) {
      document.body.removeChild(ghostbar)
      document.removeEventListener('mousemove', moveGhostbar)
      document.removeEventListener('mouseup', removeGhostbar)
      document.removeEventListener('keydown', cancelGhostbar)
      self.event.trigger('resize', [document.body.offsetWidth - getPosition(event)])
    }
  }
}

const css = csjs`
  .lefticonpanel      {
    display            : flex;
    flex-direction     : column;
    top                : 0;
    right              : 0;
    bottom             : 0;
    box-sizing         : border-box;
    overflow           : hidden;
    height             : 100%;
  }
  .header              {
    height             : 100%;
  }
  .dragbar             {
    position           : absolute;
    width              : 0.5em;
    top                : 3em;
    bottom             : 0;
    cursor             : col-resize;
    z-index            : 999;
    border-left        : 2px solid ${styles.rightPanel.bar_Dragging};
  }
  .ghostbar           {
    width             : 3px;
    background-color  : ${styles.rightPanel.bar_Ghost};
    opacity           : 0.5;
    position          : absolute;
    cursor            : col-resize;
    z-index           : 9999;
    top               : 0;
    bottom            : 0;
  }
  i.plugin            {
    cursor            : pointer;
  }
`
