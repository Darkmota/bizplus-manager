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
  $ge (value, signalValue) {
    return value > signalValue
  }
  $le (value, signalValue) {
    return value < signalValue
  }
  $gte (value, signalValue) {
    return value >= signalValue
  }
  $lte (value, signalValue) {
    return value <= signalValue
  }
  $in (value, signalValue) {
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
  }
  simpleJudge (documentNodeValue, conditionsNode) {
    for (let publicKey in conditionsNode) {
      let conditionValue = conditionsNode[publicKey]
      if (typeof conditionValue === 'object') {
        for (let signalType in conditionValue) {
          let signalValue = conditionValue[signalType]
          if (!this[signalType](documentNodeValue, signalValue)) {
            return false
          }
        }
      } else {
        if (!this.$eq(documentNodeValue, conditionValue)) {
          return false
        }
      }
    }
    return true
  }
  judge (documentNode, conditionsNode) {
    for (let publicKey in conditionsNode) {
      let conditionValue = conditionsNode[publicKey]
      let documentNodeValue = documentNode[publicKey]
      if (publicKey[0] === '$') {
        if (!this[publicKey](documentNodeValue, conditionsNode)) {
          return false
        }
      }
      if (publicKey.indexOf('.') !== -1) {
        let keys = publicKey.split('.')
        let currentDocumentNode = documentNode
        for (let key of keys) {
          if (currentDocumentNode === null || currentDocumentNode === undefined) {
            return false
          }
          currentDocumentNode = currentDocumentNode[key]
        }
        if (!this.simpleJudge(currentDocumentNode, conditionValue)) {
          return false
        }
      } else {
        if (!this.simpleJudge(documentNodeValue, conditionValue)) {
          return false
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
