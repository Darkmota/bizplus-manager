const fs = require('fs')

module.exports = {
  async readBucket (bucketPath) {
    return new Promise((resolve, reject) => {
      fs.access(bucketPath, async (result) => {
        console.log('x', result)
        fs.readFile(bucketPath, 'utf8', async (err, result) => {
          let obj = JSON.parse(result)
          let returnValue = {
            data: obj.data
          }
          if (obj.nextIndex !== undefined) {
            returnValue.nextIndex = obj.nextIndex
          }
          resolve(returnValue)
        })
      }, (err) => {
        reject(err)
      })
    })
  },
  async readTable (tablePath) {
    if (tablePath[tablePath.length - 1] !== '/') {
      tablePath += '/'
    }
    let data = []
    let nextIndex = 0
    return new Promise(async (resolve, reject) => {
      let promises = []
      for (let bucketIndex = 0; ; bucketIndex++) {
        let bucketPath = `${tablePath}${bucketIndex}.json`
        let bucketData = await this.readBucket(bucketPath)
        
      }
    })
  }
}
