const fs = require('fs')

module.exports = {
  async readBucket (bucketPath, converter) {
    return new Promise((resolve, reject) => {
      fs.readFile(bucketPath, 'utf8', async (err, result) => {
        if (err) {
          if (err.errno === -4058) {
            resolve('end')
          } else {
            reject(err)
          }
          return
        }
        console.log('Result', result)
        let obj = JSON.parse(result)
        let returnValue = {
          data: obj.data.map(converter)
        }
        if (obj.nextIndex !== undefined) {
          returnValue.nextIndex = obj.nextIndex
        }
        resolve(returnValue)
      })
    })
  },
  async readTable (tablePath, converter) {
    if (tablePath[tablePath.length - 1] !== '/') {
      tablePath += '/'
    }
    let data = []
    let nextIndex = 0
    return new Promise(async (resolve, reject) => {
      for (let bucketIndex = 0; ; bucketIndex++) {
        let bucketPath = `${tablePath}${bucketIndex}.json`
        console.log(`Bucket ${bucketPath} start loading...`)
        let bucketData
        try {
          bucketData = await this.readBucket(bucketPath, converter)
          if (bucketData === 'end') {
            console.log(`Bucket ${bucketPath} not found, all buckets are loaded.`)
            break
          }
        } catch (err) {
          console.log(`Bucket ${bucketPath} load error: ${err}`)
          break
        }
        if (bucketData.nextIndex !== undefined) {
          nextIndex = bucketData.nextIndex
        }
        data.push(bucketData.data)
      }
      resolve({
        data: data,
        nextIndex: nextIndex
      })
    })
  }
}
