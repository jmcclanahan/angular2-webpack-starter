var fs     = require('fs')
var path   = require('path')
var mkdirp = require('mkdirp')
var _      = require('lodash')
var argv   = require('yargs').argv

var template = _.template
var parent   = argv.parent || ''
var _root    = path.resolve(__dirname, '..', '..', 'src', parent)

var COMPONENT = 'Component'
var DIRECTIVE = 'Directive'
var SERVICE   = 'Service'
var ENUM      = 'Enum'
var INTERFACE = 'Interface'
var PIPE      = 'Pipe'

// Templates
var COMPONENT_TEMPLATE      = path.resolve(__dirname, 'temp.component.tpl')
var COMPONENT_HTML_TEMPLATE = path.resolve(__dirname, 'temp.component.html.tpl')
var COMPONENT_CSS_TEMPLATE  = path.resolve(__dirname, 'temp.component.css.tpl')
var COMPONENT_SPEC_TEMPLATE = path.resolve(__dirname, 'temp.component.spec.tpl')
var DIRECTIVE_TEMPLATE      = path.resolve(__dirname, 'temp.directive.tpl')
var DIRECTIVE_SPEC_TEMPLATE = path.resolve(__dirname, 'temp.directive.spec.tpl')
var SERVICE_TEMPLATE        = path.resolve(__dirname, 'temp.service.tpl')
var SERVICE_SPEC_TEMPLATE   = path.resolve(__dirname, 'temp.service.spec.tpl')
var ENUM_TEMPLATE           = path.resolve(__dirname, 'temp.enum.tpl')
var INTERFACE_TEMPLATE      = path.resolve(__dirname, 'temp.tpl')
var PIPE_TEMPLATE           = path.resolve(__dirname, 'temp.pipe.tpl')
var PIPE_SPEC_TEMPLATE      = path.resolve(__dirname, 'temp.pipe.spec.tpl')

// Files To Create
var COMPONENT_FILE      = `${_root}/${argv.name}/${argv.name}.component.ts`
var COMPONENT_HTML_FILE = `${_root}/${argv.name}/${argv.name}.component.html`
var COMPONENT_CSS_FILE  = `${_root}/${argv.name}/${argv.name}.component.css`
var COMPONENT_SPEC_FILE = `${_root}/${argv.name}/${argv.name}.component.spec.ts`
var DIRECTIVE_FILE      = `${_root}/${argv.name}.directive.ts`
var DIRECTIVE_SPEC_FILE = `${_root}/${argv.name}.directive.spec.ts`
var SERVICE_FILE        = `${_root}/${argv.name}.service.ts`
var SERVICE_SPEC_FILE   = `${_root}/${argv.name}.service.spec.ts`
var ENUM_FILE           = `${_root}/${argv.name}.enum.ts`
var INTERFACE_FILE      = `${_root}/${argv.name}.ts`
var PIPE_FILE           = `${_root}/${argv.name}.pipe.ts`
var PIPE_SPEC_FILE      = `${_root}/${argv.name}.pipe.spec.ts`

var files = new Map()
var options = {
  'name': argv.name,
  'classifiedName': argv.name.charAt(0).toUpperCase() + argv.name.slice(1),
  'interfacePrefix': 'I'
}

createDirectory()

switch(argv.template) {
  case COMPONENT:
    files.set(COMPONENT_TEMPLATE, COMPONENT_FILE)
    files.set(COMPONENT_HTML_TEMPLATE, COMPONENT_HTML_FILE)
    files.set(COMPONENT_CSS_TEMPLATE, COMPONENT_CSS_FILE)
    files.set(COMPONENT_SPEC_TEMPLATE, COMPONENT_SPEC_FILE)
    break
  case DIRECTIVE:
    files.set(DIRECTIVE_TEMPLATE, DIRECTIVE_FILE)
    files.set(DIRECTIVE_SPEC_TEMPLATE, DIRECTIVE_SPEC_FILE)
    break
  case SERVICE:
    files.set(SERVICE_TEMPLATE, SERVICE_FILE)
    files.set(SERVICE_SPEC_TEMPLATE, SERVICE_SPEC_FILE)
    break
  case ENUM:
    files.set(ENUM_TEMPLATE, ENUM_FILE)
    break
  case INTERFACE:
    files.set(INTERFACE_TEMPLATE, INTERFACE_FILE)
    break
  case PIPE:
    files.set(PIPE_TEMPLATE, PIPE_FILE)
    files.set(PIPE_SPEC_TEMPLATE, PIPE_SPEC_FILE)
    break
  default:
    break
}

createFiles()

function createDirectory() {
  var path = argv.template === COMPONENT ? `${_root}/${argv.name}` : _root
  mkdirp(path, function(err) {
    if (err) throw err
  })
}

function createFiles() {
  for (let [key, value] of files) {
    fs.readFile(key, "utf8", function(err, data) {
      if (err) { throw err }
      var compiled = template(data)
      fs.appendFile(value, compiled(options))
    })
  }
}
