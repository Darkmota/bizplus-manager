import React, { Component } from 'react'
import { Input, Layout } from 'antd' 
import ListForm from './ListForm'
import StringForm from './StringForm'

class ObjectForm extends Component {
  bubble = (method, keyArray, value) => {
    keyArray.unshift(this.props.keyName)
    this.props.onBubble(method, keyArray, value)
  }
  render () {
    let jsx = []
    for (let key in this.props.data) {
      let childData = this.props.data[key]
      let newKeyArray = Object.assign([], this.props.keyArray)
      newKeyArray.push(key)
      let ChildComponent
      if (childData instanceof Array) {
        ChildComponent = ListForm
      } else if (typeof childData === 'object') {
        ChildComponent = ObjectForm
      } else {
        ChildComponent = StringForm
      }
      jsx.push(<ChildComponent key={key} keyArray={newKeyArray} onBubble={this.bubble.bind(this)} data={childData}></ChildComponent>)
    }
    return jsx
  }
}

export default ObjectForm
