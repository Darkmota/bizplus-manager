const Conditions = require('./Conditions')

class Query {
  constructor (creator, document) {
    this._creator = creator
    this.document = document
  }
  async findOne (conditions) {
    let length = this.data.length
    for (let index = 0; index < length; index++) {
      let currentDocument = this.data[index]
      let currentConditions = new Conditions(conditions)
      if (currentConditions.meet(currentDocument)) {
        return document
      }
    }
  }
  async find (conditions) {
    let length = this.data.length
    let result = []
    for (let index = 0; index < length; index++) {
      let currentDocument = this.data[index]
      let currentConditions = new Conditions(conditions)
      if (currentConditions.meet(currentDocument)) {
        result.push(document)
      }
    }
    return new Query(this, result)
  }
  sort (sortby) {
    let newDocument = Object.assign([], this.document)
    newDocument.sort((a, b) => {
      for (let key in sortby) {
        if (a[key] === b[key]) {
          continue
        } else {
          return ((a[key] > b[key] && sortby[key] === 1) || (a[key] < b[key] && sortby[key] === -1)) ? 1 : -1
        }
      }
      return 0
    })
    return new Query(this, newDocument)
  }
  skip (amount) {
    return new Query(this, this.document.slice(amount))
  }
  limit (amount) {
    return new Query(this, this.document.slice(0, amount))
  }
  getCreator () {
    return this._creator
  }
}

module.exports = Query
