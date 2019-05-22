const file = require('./utils/file')
const Query = require('./Query')
const Conditions = require('./Conditions')

class Model {
  constructor (schema, tableName) {
    this._schema = schema
    this.tableName = tableName
    this.columns = {}
    for (let key in schema) {
      let column = schema[key]
      if (typeof column === 'function') {
        this.columns[key] = {
          type: column,
          default: () => {
            return null
          }
        }
      } else {
        this.columns[key] = {
          type: column.type,
          default: (args, context) => {
            if (typeof column.default === 'function') {
              return column.default.apply(context || this, args)
            } else {
              return column.default
            }
          }
        }
      }
    }
    this.isLoaded = false
    this.data = []
    this.nextIndex = 0
  }
  getSchema () {
    return this._schema
  }
  async load () {
    let path = `./db/${this.tableName}`
    let result = await file.readTable(path, entity => {
      let cleanDocument = {}
      for (let key in this.columns) {
        let column = this.columns[key]
        cleanDocument[key] = entity[key] === undefined ? column.default() : column.type(entity[key])
      }
      return cleanDocument
    })
    this.data = result.data
    console.log(JSON.stringify(result, null, 2))
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
      await this.load()
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
