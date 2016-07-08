const fs     = require('fs')
const path   = require('path')
const mkdirp = require('mkdirp')
const _      = require('lodash')
const argv   = require('yargs').argv
const helpers = require('../helpers')

const template = _.template
const parent   = argv.parent || ''
const _root    = helpers.root('src', 'app', parent)

const COMPONENT = 'Component'
const DIRECTIVE = 'Directive'
const SERVICE   = 'Service'
const ENUM      = 'Enum'
const INTERFACE = 'Interface'
const PIPE      = 'Pipe'

// Templates
const COMPONENT_TEMPLATE      = path.resolve(__dirname, 'temp.component.tpl')
const COMPONENT_HTML_TEMPLATE = path.resolve(__dirname, 'temp.component.html.tpl')
const COMPONENT_CSS_TEMPLATE  = path.resolve(__dirname, 'temp.component.css.tpl')
const COMPONENT_SPEC_TEMPLATE = path.resolve(__dirname, 'temp.component.spec.tpl')
const DIRECTIVE_TEMPLATE      = path.resolve(__dirname, 'temp.directive.tpl')
const DIRECTIVE_SPEC_TEMPLATE = path.resolve(__dirname, 'temp.directive.spec.tpl')
const SERVICE_TEMPLATE        = path.resolve(__dirname, 'temp.service.tpl')
const SERVICE_SPEC_TEMPLATE   = path.resolve(__dirname, 'temp.service.spec.tpl')
const ENUM_TEMPLATE           = path.resolve(__dirname, 'temp.enum.tpl')
const INTERFACE_TEMPLATE      = path.resolve(__dirname, 'temp.tpl')
const PIPE_TEMPLATE           = path.resolve(__dirname, 'temp.pipe.tpl')
const PIPE_SPEC_TEMPLATE      = path.resolve(__dirname, 'temp.pipe.spec.tpl')

// Files To Create
const COMPONENT_FILE      = path.resolve(_root, argv.name, `${argv.name}.component.ts`)
const COMPONENT_HTML_FILE = path.resolve(_root, argv.name, `${argv.name}.component.html`)
const COMPONENT_CSS_FILE  = path.resolve(_root, argv.name, `${argv.name}.component.css`)
const COMPONENT_SPEC_FILE = path.resolve(_root, argv.name, `${argv.name}.component.spec.ts`)
const DIRECTIVE_FILE      = path.resolve(_root, `${argv.name}.directive.ts`)
const DIRECTIVE_SPEC_FILE = path.resolve(_root, `${argv.name}.directive.spec.ts`)
const SERVICE_FILE        = path.resolve(_root, `${argv.name}.service.ts`)
const SERVICE_SPEC_FILE   = path.resolve(_root, `${argv.name}.service.spec.ts`)
const ENUM_FILE           = path.resolve(_root, `${argv.name}.enum.ts`)
const INTERFACE_FILE      = path.resolve(_root, `${argv.name}.ts`)
const PIPE_FILE           = path.resolve(_root, `${argv.name}.pipe.ts`)
const PIPE_SPEC_FILE      = path.resolve(_root, `${argv.name}.pipe.spec.ts`)

const files = new Map()
const options = {
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
  const dir = argv.template === COMPONENT ? path.resolve(_root, argv.name) : _root
  mkdirp(dir, function(err) {
    if (err) { throw err }
  })
}

function createFiles() {
  for (let [key, value] of files) {
    fs.readFile(key, "utf8", function(err, data) {
      if (err) { throw err }
      const compiled = template(data)
      fs.appendFile(value, compiled(options))
    })
  }
}
