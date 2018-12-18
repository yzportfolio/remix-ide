var yo = require('yo-yo')
var csjs = require('csjs-inject')
const remixLib = require('remix-lib')

const styleguide = require('../ui/styles-guide/theme-chooser')
const styles = styleguide.chooser()

var globalRegistry = require('../../global/registry')

const PluginManager = require('../plugin/pluginManager')
const TabbedMenu = require('../tabs/tabbed-menu')
const CompileTab = require('../tabs/compile-tab')
const SettingsTab = require('../tabs/settings-tab')
const AnalysisTab = require('../tabs/analysis-tab')
const DebuggerTab = require('../tabs/debugger-tab')
const SupportTab = require('../tabs/support-tab')
const PluginTab = require('../tabs/plugin-tab')
const TestTab = require('../tabs/test-tab')
const RunTab = require('../tabs/run-tab')
const DraggableContent = require('../ui/draggableContent')

const EventManager = remixLib.EventManager
var FileManager = require('./file-panel')

class SwapPanel {
  constructor (localRegistry, api, events, opts = {}) {
    var self = this

    self.event = new EventManager()
    self.opts = opts
    self._api = api
    self._consumedEvents = events
    self._view = undefined

    // this.event = new EventManager()
    self._components = {}
    self._components.registry = localRegistry || globalRegistry
    self._components.registry.put({api: this, name: 'righthandpanel'})
    self._components.filePanel = new FileManager()
    self._components.runTab = new RunTab(self._components.registry)

    self.pluginList = [
        {type: 'fileManager', className: 'FileManager', displayName: 'File Manger', icon: 'fa fa-files-o fa-2x'},
        {type: 'pluginManager', displayName: 'Plugin Manger', icon: 'fa fa-puzzle-piece fa-2x'},
        {type: 'settings', displayName: 'setting', icon: 'fa fa-cog fa-2x'}
    ]

    var view = yo`
      <div id='plugins' class=${css.plugins} >
        <div class=${css.plugItIn} >
            <h1> wazzp </h1>
            <ul> <li> User Funds: lalal </li> </ul>
            <button class=${css.clearFunds} > spend all funds </button>
        </div>
        <div class="${css.plugItIn}">
            ${self._components.filePanel.render()}
        </div>
        <div class="${css.plugItIn} ${css.active}">
            ${self._components.runtab.render()}
        </div>
      </div>
    `

    // var pluginLoaded = document.querySelector(`.${css.plugins}`)
    // self.view.appendChild(self._components.filePanel.render())

    if (!self._view) {
      self._view = view
    }
    return self._view
  }

//   update () {
//     yo.update(this._view, this.render())
//   }
  _constraint (msg) { throw new Error(msg) }
}

module.exports = SwapPanel

const css = csjs`
  .plugins        {
    width          : 300px;
  }
  .plugItIn       {
    display        : none;
  }
  .plugItIn.active     {
    display        :block;
  }
  .clearFunds { background-color: lightblue; }
`
