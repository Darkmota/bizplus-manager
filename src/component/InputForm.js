import React, { Component } from 'react'
import { Input, Layout } from 'antd'
import { blue } from '@ant-design/colors'

class InputForm extends Component {
  constructor (props) {
    super(props)
  }
  state = {
    defaultValue: this.props.defaultValue,
    value: this.props.defaultValue,
    isEdited: false,
    restoreSymbol: this.props.restoreSymbol
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.restoreSymbol !== this.state.restoreSymbol) {
      this.props.onChange(nextProps.defaultValue, this.state.isEdited ? -1 : 0)
      this.setState({
        value: this.state.defaultValue,
        restoreSymbol: nextProps.restoreSymbol,
        isEdited: false
      })
    }
    /*
    this.setState({
      // defaultValue: nextProps.defaultValue,
      value: nextProps.defaultValue,
      isEdited: false
    })
    */
  }
  onChange = event => {
    let value = event.target.value
    let isEdited = this.state.defaultValue !== value
    let counterDelta = isEdited - this.state.isEdited
    this.setState({ value, isEdited })
    this.props.onChange(value, counterDelta)
  }
  render () {
    // console.log(this.props.defaultValue, this.state.value)
    return (
      <>
        <Input value={this.state.value} style={{ backgroundColor: this.state.isEdited ? blue[1] : 'white' }} defaultValue={this.props.defaultValue} onChange={this.onChange.bind(this)}></Input>
      </>
    )
  }
}

export default InputForm
