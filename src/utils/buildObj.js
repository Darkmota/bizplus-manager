let arrayKeyMap = new Map()

export function objectAdd (objPtr, keyArray, isArrayKeyArray, value) {
  let path = ''
  let keyArrayLength = keyArray.length
  for (let keyIndex = 0; keyIndex < keyArrayLength; keyIndex++) {
    path = path === '' ? keyArray[keyIndex] : `${path}.${keyArray[keyIndex]}`
    let isOver = keyIndex === keyArray.length - 1
    if (isArrayKeyArray[keyIndex]) {
      let filteredArrayKey = arrayKeyMap.get(path)
      if (filteredArrayKey) {
        if (isOver) {
          objPtr[filteredArrayKey] = value
        } else {
          objPtr = objPtr[filteredArrayKey]
        }
      } else {
        let nextArrayKey = objPtr.length
        arrayKeyMap.set(path, nextArrayKey)
        if (isOver) {
          objPtr.push(value)
        } else {
          objPtr.push(isArrayKeyArray[keyIndex + 1] ? [] : {})
          objPtr = objPtr[nextArrayKey]
        }
      }
    } else {
      let currentKey = keyArray[keyIndex]
      if (isOver) {
        objPtr[currentKey] = value
      } else {
        if (objPtr[currentKey] === null || objPtr[currentKey] === undefined) {
          objPtr[currentKey] = isArrayKeyArray[keyIndex + 1] ? [] : {}
        }
        objPtr = objPtr[currentKey]
      }
    }
  }
}

export function getIsArrayKeyArray (keyArray) {
  return keyArray.map(key => key[0] === '$' && key[1] !== '$')
}

export function buildObj (kvArray, reverse) {
  let returnObj = {}
  arrayKeyMap.clear()
  for (let kv of kvArray) {
    let keyArray = kv.key.split('.')
    if (reverse) {
      keyArray.push(keyArray.shift())
    }
    console.log(`\x1B[44mbuildObj\x1B[0m:`, kv)
    objectAdd(returnObj, keyArray, getIsArrayKeyArray(keyArray), kv.value)
    console.log(`\x1B[42mreturnObj\x1B[0m:`, JSON.stringify(returnObj, null, 1))
  }
  return returnObj
}

module.exports = buildObj
