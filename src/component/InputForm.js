import React, { Component } from 'react'
import { Input, Layout } from 'antd'
import { blue } from '@ant-design/colors'

class InputForm extends Component {
  constructor (props) {
    super(props)
  }
  state = {
    value: this.props.defaultValue
  }
  onChange = event => {
    let newValue = event.target.value
    this.setState({value: newValue})
    this.props.onChange(event)
  }
  render () {
    console.log(this.props.defaultValue, this.state.value)
    return (
      <>
        <Input style={{ backgroundColor: this.props.defaultValue === this.state.value ? 'white' : blue[1] }} defaultValue={this.props.defaultValue} onChange={this.onChange.bind(this)}></Input>
      </>
    )
  }
}

export default InputForm
