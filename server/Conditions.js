class Conditions {
  constructor (conditions) {
    this.conditions = conditions
  }
  $eq (value, signalValue) {
    return value === signalValue
  }
  $ne (value, signalValue) {
    return value !== signalValue
  }
  $gt (value, signalValue) {
    return value > signalValue
  }
  $lt (value, signalValue) {
    return value < signalValue
  }
  $gte (value, signalValue) {
    return value >= signalValue
  }
  $lte (value, signalValue) {
    return value <= signalValue
  }
  $in (value, signalValue) {
    console.log('$in', value, signalValue)
    for (let inValue of signalValue) {
      if (value === inValue) {
        return true
      }
    }
    return false
  }
  $or (documentNode, conditionsNode) {
    for (let orNode of conditionsNode) {
      if (this.judge(documentNode, orNode)) {
        return true
      }
    }
    return false
  }
  judge (documentNode, conditionsNode) {
    console.log('judge', documentNode, conditionsNode)
    if (typeof conditionsNode !== 'object') {
      return documentNode === conditionsNode
    } else {
      for (let publicKey in conditionsNode) {
        console.log('publicKey', publicKey)
        let conditionValue = conditionsNode[publicKey]
        let documentNodeValue = documentNode[publicKey]
        console.log('documentNodeValue', documentNodeValue)
        console.log('conditionValue', conditionValue)
        if (publicKey[0] === '$') { // $or
          if (!this[publicKey](documentNode, conditionValue)) {
            return false
          }
        } else {
          let keys = publicKey.split('.')
          let currentDocumentNode = documentNode
          for (let key of keys) {
            if (currentDocumentNode === null || currentDocumentNode === undefined) {
              return false
            }
            currentDocumentNode = currentDocumentNode[key]
          }
          if (!this.judge(currentDocumentNode, conditionValue)) {
            return false
          }
        }
      }
    }
    return true
  }
  meet (document) {
    return this.judge(document, this.conditions)
  }
}

module.exports = Conditions
