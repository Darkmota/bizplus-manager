import React, { Component } from 'react'
import { Input, Layout } from 'antd' 
import { UPDATE } from '../utils/method'

class StringForm extends Component {
  constructor (props) {
    super(props)
  }
  bubble = (method, keyArray, value) => {
    keyArray.unshift(this.props.keyName)
    this.props.onBubble(method, keyArray, value)
  }
  onChange = event => {
    this.bubble(UPDATE, this.props.keyArray, event.target.value)
  }
  render () {
    return (
      <>
        <h5>{this.props.keyArray ? this.props.keyArray.join('.') : 'root'}</h5>
        <Input value={this.props.data} onChange={this.onChange.bind(this)}></Input>
      </>
    )
  }
}

export default StringForm
