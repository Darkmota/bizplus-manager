const file = require('./utils/file')
const Query = require('./Query')
const Conditions = require('./Conditions')

function fetch () {
  return new Promise(async (resolve, reject) => {
    let path = `./db/${this.tableName}`
    let result = await file.readTable(path, this.parse.bind(this))
    this.data = result.data
    console.log(JSON.stringify(result, null, 2))
  })
}

class Model {
  constructor (schema, tableName, loadFunction) {
    this._schema = schema
    this.tableName = tableName
    this.isLoaded = false
    this.data = []
    this.nextIndex = 0
    this.loadFunction = loadFunction
  }
  getSchema () {
    return this._schema
  }
  _parse (documentNode, schemaNode, depth) {
    let returnValue
    let space = ''
    for (let i = 0; i < depth; ++i) {
      space += '| '
    }
    console.log(`${space}\x1b[${31+depth}mD${depth}\x1b[0m `, JSON.stringify(documentNode))
    console.log(`${space}\x1b[${31+depth}mS${depth}\x1b[0m `, schemaNode)
    if (schemaNode === Number || schemaNode === String || schemaNode === Boolean || schemaNode === Date) {
      returnValue = schemaNode(documentNode)
    } else if (schemaNode instanceof Array) {
      returnValue = documentNode.map(arrayElement => this._parse(arrayElement, schemaNode[0], depth+1))
    } else if (typeof schemaNode === 'object') {
      if (schemaNode.type && schemaNode.default !== undefined) {
        if (documentNode) {
          returnValue = this._parse(documentNode, schemaNode.type, depth+1)
        } else if (typeof schemaNode.default === 'function') {
          returnValue = schemaNode.default(documentNode)
        } else {
          returnValue = schemaNode.default
        }
      } else {
        returnValue = {}
        for (let key in schemaNode) {
          returnValue[key] = this._parse(documentNode[key], schemaNode[key], depth+1)
        }
      }
    }
    console.log(`${space}\x1b[${31+depth}m${depth}=>\x1b[0m `, JSON.stringify(returnValue))
    return returnValue
  }
  parse (documentNode) {
    return this._parse(documentNode, this._schema, 0)
  }
  async load (fetchFunc, args) {
    return await fetchFunc.apply(this, args)
  }
  async findOne (conditions) {
    if (!this.isLoaded) {
      await this.load()
      this.isLoaded = true
    }
    let length = this.data.length
    let currentConditions = new Conditions(conditions)
    for (let index = 0; index < length; index++) {
      let currentDocument = this.data[index]
      if (currentConditions.meet(currentDocument)) {
        console.log('FINDONE:', currentDocument)
        return currentDocument
      }
    }
  }
  async find (conditions) {
    if (!this.isLoaded) {
      await this.load(fetch)
      this.isLoaded = true
    }
    let length = this.data.length
    let result = []
    let currentConditions = new Conditions(conditions)
    for (let index = 0; index < length; index++) {
      let currentDocument = this.data[index]
      if (currentConditions.meet(currentDocument)) {
        result.push(currentDocument)
      }
    }
    console.log('FIND:', result)
    return new Query(this, result)
  }
  async create (document) {
    if (!this.isLoaded) {
      await this.load()
      this.isLoaded = true
    }
    if (document instanceof Array) {
      
    } else {

    }
  }
}

module.exports = Model

