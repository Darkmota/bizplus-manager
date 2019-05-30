import React, { Component } from 'react'
import { Input, Layout } from 'antd'
import { UPDATE } from '../utils/method'

class StringForm extends Component {
  constructor (props) {
    super(props)
    console.log('node', this.props.node)
    console.log('childKey', this.props.childKey)
  }
  bubble = (method, value) => {
    this.props.onBubble(method, this.childKey, value)
  }
  onChange = event => {
    this.bubble(UPDATE, this.props.childKey, event.target.value)
  }
  render () {
    return (
      <>
        <h5>{this.props.childKey}</h5>
        <Input defaultValue={this.props.node} onChange={this.onChange.bind(this)}></Input>
      </>
    )
  }
}

export default StringForm
