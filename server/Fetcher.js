class Fetcher {
  constructor (fetchFunction, args) {
    this.fetchFunction = fetchFunction.bind(this, args)
    this.isFetched = false
    this.data = null
  }
  async get () {
    if (this.isFetched) {
      return this.data
    } else {
      this.data = await this.fetchFunction()
    }
  }
  async set () {
    
  }
}

module.exports = Fetcher
