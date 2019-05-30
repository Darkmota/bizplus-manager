import React, { Component } from 'react'
import { Input, Layout } from 'antd' 
import ListForm from './ListForm'
import StringForm from './StringForm'
import { INSERT, UPDATE } from '../utils/method'

class ObjectForm extends Component {
  constructor (props) {
    super(props)
    console.log('node', this.props.node)
    console.log('childKey', this.props.childKey)
  }
  catchBubble = (method, key, value) => {
    switch (method) {
      case UPDATE:
        this.props.node[key] = value
        break
    }
  }
  render () {
    let jsx = []
    for (let key in this.props.node) {
      let childNode = this.props.node[key]
      let ChildComponent
      if (childNode instanceof Array) {
        ChildComponent = ListForm
      } else if (typeof childNode === 'object') {
        ChildComponent = ObjectForm
      } else {
        ChildComponent = StringForm
      }
      jsx.push(<ChildComponent key={key} node={childNode} childKey={key} onBubble={this.catchBubble.bind(this)}></ChildComponent>)
    }
    return jsx
  }
}

export default ObjectForm
