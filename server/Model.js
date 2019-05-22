const fs = require('fs')
const file = require('./utils/file')

module.exports = class {
  constructor (model) {
    this.name = model.name
    this.query = model.query
    this.isLoaded = false
    this.data = []
    this.nextIndex = 0
  }
  async load () {
    let path = `./db/${this.name}.json`
    return new Promise((resolve, reject) => {
    })
  }
  async create (doc) {
    if (!this.isLoaded) {
      await this.load()
      this.isLoaded = true
    }
    if (doc instanceof Array) {

    } else {
    }
  }
}

