var yo = require('yo-yo')
var csjs = require('csjs-inject')
const remixLib = require('remix-lib')

var globalRegistry = require('../../global/registry')

const styleguide = require('../ui/styles-guide/theme-chooser')

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
const styles = styleguide.chooser()

var FileManager = require('./file-panel')



class SwapPanel {
  constructor (api, events, opts = {}) {
    var self = this

    self.event = new EventManager()
    self.opts = opts
    self._api = api
    self._consumedEvents = events
    self._view = undefined

    this.event = new EventManager()
    self._components = {}

    self.pluginList = [
        {type: 'fileManager', className: 'FileManager', displayName: 'File Manger', icon: 'fa fa-files-o fa-2x'},
        {type: 'pluginManager', displayName: 'Plugin Manger', icon: 'fa fa-puzzle-piece fa-2x'},
        {type: 'settings', displayName: 'setting', icon: 'fa fa-cog fa-2x'}
    ]

    // ***********************************//
    // This section is taken from app.js - it probably isn't necessary

    // registry.put({api: self, name: 'app'})

    // var fileStorage = new Storage('sol:')
    // registry.put({api: fileStorage, name: 'fileStorage'})

    // var configStorage = new Storage('config:')
    // registry.put({api: configStorage, name: 'configStorage'})

    // self._components.config = new Config(fileStorage)
    // registry.put({api: self._components.config, name: 'config'})

    // executionContext.init(self._components.config)
    // executionContext.listenOnLastBlock()

    // self._components.compilerImport = new CompilerImport()
    // registry.put({api: self._components.compilerImport, name: 'compilerimport'})
    // self._components.gistHandler = new GistHandler()

    // self._components.filesProviders = {}
    // self._components.filesProviders['browser'] = new Browserfiles(fileStorage)
    // self._components.filesProviders['config'] = new BrowserfilesTree('config', configStorage)
    // self._components.filesProviders['config'].init()
    // registry.put({api: self._components.filesProviders['browser'], name: 'fileproviders/browser'})
    // registry.put({api: self._components.filesProviders['config'], name: 'fileproviders/config'})
    // ***********************************//

    // making a new swap panel uhhhh nope
    // self._components.swapPanel = new SwapPanel()
    // self._view.swappanel.appendChild(self._components.swapPanel.render())

    // events.funds.register('fundsChanged', function (amount) {
    //   if (amount < self.state._funds) self.state.totalSpend += self.state._funds - amount
    //   self.state._funds = amount
    //   self.render()
    // })
    // self.event.trigger('eventName', [param1, param2])
  }

  // try putting the filePanel in the swap panel
  // where do we put the stack of divs?
  // we need to rough them in - where
  // we need to append them to the thing
  // we need to buy a new monitor
  // the render roughs them in in app line 220
  //

  // I was getting getComponents into shape - but it was choaking on line 105  self._components.${inp.type}
//   getComponents () {
//     if (self.pluginList) {
//       return yo`div id='plugins' class=${css.plugins} >

//         ${self.pluginList.map(function (inp) {
//             // grab the plugin
//             // does it have a class name?
//             if (inp.className) {
//                 // self._components.filePanel = new FilePanel()
//                 self._components.${inp.type} = new ${inp.className}
//                 ${self._components.filePanel.render()}
//                 return yo`<div class="${css.plugItIn} ${css.active}"><label for="${inp.name}"> ${inp.name}: </label><input placeholder="${inp.type}" title="${inp.name}"></div>`
//             }

//             // if nothing comes back print out error
//             // do this 1st for 1 plugin then try doing it for mutliple

//         })}
//       </div>`
//     }
//   }

  render () {
    var self = this
    // grab the array of active plugins
    self.pluginList.map(function (inp) {
      return yo`<div class="${css.multiArg}"><label for="${inp.name}"> ${inp.name}: </label><input placeholder="${inp.type}" title="${inp.name}"></div>`
    })
    // if nothing loads - then?
    // how turn off the panel?

    self._components.filePanel = new FileManager()

    var view = yo`
      <div id='plugins' class=${css.plugins} >
        <div class=${css.plugItIn} >
            <h1> wazzp </h1>
            <ul> <li> User Funds: lalal </li> </ul>
            <button class=${css.clearFunds} > spend all funds </button>
        </div>
        <div class="${css.plugItIn} ${css.active}">
            ${self._components.filePanel.render()}
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