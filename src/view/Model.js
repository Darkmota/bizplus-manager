import React, { Component } from 'react'
class Model extends Component {
  constructor (props) {
    super(props)
    this.schema = props.schema
    this.data = props.data
    this.tableName = props.tableName
    this.isLoaded = false
    this.data = []
    this.nextIndex = 0
  }
  parse (documentNode, schemaNode, depth) {
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
      returnValue = documentNode.map(arrayElement => this.parse(arrayElement, schemaNode[0], depth+1))
    } else if (typeof schemaNode === 'object') {
      if (schemaNode.type && schemaNode.default !== undefined) {
        if (documentNode) {
          returnValue = this.parse(documentNode, schemaNode.type, depth+1)
        } else if (typeof schemaNode.default === 'function') {
          returnValue = schemaNode.default(documentNode)
        } else {
          returnValue = schemaNode.default
        }
      } else {
        returnValue = {}
        for (let key in schemaNode) {
          returnValue[key] = this.parse(documentNode[key], schemaNode[key], depth+1)
        }
      }
    }
    console.log(`${space}\x1b[${31+depth}m${depth}=>\x1b[0m `, JSON.stringify(returnValue))
    return returnValue
  }
  render() {
    return this.parse(this.props.dataNode, this.schema, 0)
  }
}

module.exports = Model

