import React, { Component } from 'react'
import { Row, Col, Button } from 'antd'
import { DELETE, INSERT, APPEND } from '../utils/method'
import ObjectForm from './ObjectForm'
import StringForm from './StringForm'
class ListForm extends Component {
  constructor (props) {
    super(props)
    console.log('node', this.props.node)
    console.log('value', this.props.data)
    this.state = {
      tempData: null
    }
  }
  catchBubble = (method, key, value) => {
    switch (method) {
      case INSERT:
        this.props.node.splice(key, 0, value)
        break
      case DELETE:
        this.props.node.splice(key, 1)
        break
      case APPEND:
        this.props.node.push(value)
        break
    }
  }
  onDelete = index => {
    this.catchBubble(DELETE, index, null)
  }
  onInsert = (index, value) => {
    this.catchBubble(INSERT, index, value)
  }
  onAppend = value => {
    this.catchBubble(APPEND, null, value)
  }
  onTempBubble = (method, keyArray, value) => {
    this.setState({tempData: value})
  }
  render () {
    let jsx = []
    let ChildComponent = StringForm
    for (let index = 0; index < this.props.node.length; index++) {
      let childNode = this.props.node[index]
      let newKeyArray = Object.assign([], this.props.keyArray)
      newKeyArray.push(index)
      if (childNode instanceof Array) {
        ChildComponent = ListForm
      } else if (typeof childNode === 'object') {
        ChildComponent = ObjectForm
      } else {
        ChildComponent = StringForm
      }
      jsx.push(
        <Row key={index}>
          <Col span={16}>
            <ChildComponent node={childNode} keyArray={newKeyArray} onBubble={this.catchBubble.bind(this)}></ChildComponent>
          </Col>
          <Col span={4}>
            <Button type="dashed" onClick={this.onInsert.bind(this, index)}>insert</Button>
          </Col>
          <Col span={4}>
            <Button type="danger" onClick={this.onDelete.bind(this, index)}>delete</Button>
          </Col>
        </Row>
      )
    }
    return (
      <>
        {jsx}
        <Row>
          <Col span={20}>
            <ChildComponent data={this.state.tempData} key={[]} onBubble={this.onTempBubble.bind(this)}></ChildComponent>
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
