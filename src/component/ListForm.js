import React, { Component } from 'react'
import { Row, Col, Button } from 'antd'
import { DELETE, INSERT, APPEND } from '../utils/method'
import ObjectForm from './ObjectForm'
import StringForm from './StringForm'
class ListForm extends Component {
  constructor (props) {
    super(props)
    console.log(this.props.keyArray)
    this.state = {
      tempData: null
    }
  }
  bubble = (method, keyArray, value) => {
    keyArray.unshift(this.props.keyName)
    this.props.onBubble(method, keyArray, value)
  }
  onDelete = index => {
    let keyArray = Object.assign([], this.props.keyArray)
    keyArray.push(index)
    this.bubble(DELETE, keyArray)
  }
  onInsert = (index, value) => {
    let keyArray = Object.assign([], this.props.keyArray)
    keyArray.push(index)
    this.bubble(INSERT, keyArray, value)
  }
  onAppend = value => {
    this.bubble(APPEND, this.props.keyArray, value)
  }
  onTempBubble = (method, keyArray, value) => {
    this.setState({tempData: value})
  }
  render () {
    let jsx = []
    let ChildComponent = StringForm
    for (let index = 0; index < this.props.data.length; index++) {
      let childData = this.props.data[index]
      let newKeyArray = Object.assign([], this.props.keyArray)
      newKeyArray.push(index)
      if (childData instanceof Array) {
        ChildComponent = ListForm
      } else if (typeof childData === 'object') {
        ChildComponent = ObjectForm
      } else {
        ChildComponent = StringForm
      }
      jsx.push(
        <Row key={index}>
          <Col span={16}>
            <ChildComponent data={childData} keyArray={newKeyArray} onBubble={this.bubble.bind(this)}></ChildComponent>
          </Col>
          <Col span={4}>
            <Button type="dashed" onClick={this.onInsert.bind(this, index)}>insert</Button>
          </Col>
          <Col span={4}>
            <Button type="danger" onClick={this.onDelete.bind(this, index)}>delete</Button>
          </Col>
          <ChildComponent onBubble={this.bubble.bind(this)} data={childData}></ChildComponent>
        </Row>
      )
    }
    return (
      <>
        {jsx}
        <Row>
          <Col span={20}>
            <ChildComponent data={this.state.tempData} keyArray={[]} onBubble={this.onTempBubble.bind(this)}></ChildComponent>
          </Col>
          <Col span={4}>
            <Button type="default" onClick={this.onAppend.bind(this)}>append</Button>
          </Col>
        </Row>
      </>
    )
  }
}

export default ListForm
