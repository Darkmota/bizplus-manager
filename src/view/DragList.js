import React, { Component } from 'react'
import { Button, Input, message } from 'antd'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Title from './Title'
import Paragraph from './Paragraph'
import { Radio } from 'antd'
const RadioGroup = Radio.Group
class DragList extends Component {
  constructor (props) {
    super(props)
  }

  componentDidMount () {
    this.mousemoveListener = window.addEventListener('mousemove', this.onMouseMove)
    this.listRoot = React.createRef()
    this.autoId = 0
  }

  componentWillUnmount () {
    window.removeEventListener(this.mousemoveListener)
  }

  state = {
    list: [],
    temp: null,
    contentInput: '',
    radioValue: 1
  }

  onMouseMove = e => {
    let clientX = e.clientX
    let clientY = e.clientY
    for (let i = 0; i < this.state.list.length; ++i) {
      if (this.state.list[i].type === 0) {
        let left = this.listRoot.current.clientLeft
        let right = this.listRoot.current.clientLeft + this.listRoot.current.clientWidth
        let top = this.listRoot.current.clientTop
        let bottom = this.listRoot.current.clientTop + this.listRoot.current.clientHeight
      }
    }
  }

  addButton = e => {
    if (this.state.contentInput === '') {
      message.error('最低１文字が必要です。')
      return
    }
    let newList = Object.assign([], this.state.list)
    newList.push({
      type: this.state.radioValue,
      content: this.state.contentInput,
      float: false,
      id: this.autoId++
    })
    this.setState({
      list: newList
    })
  }

  onInput = e => {
    this.setState({contentInput: e.target.value})
  }

  onRadioChange = e => {
    this.setState({radioValue: e.target.value})
  }

  startDrag = (item, e) => {
    console.log(e)
    let index = this.state.list.indexOf(item)
    let newList = Object.assign([], this.state.list)
    newList[index].float = true
    this.setState({
      list: newList
    })
  }

  endDrag = (item, e) => {
    console.log(e)
    let index = this.state.list.indexOf(item)
    let newList = this.state.list.map(item => ({
      ...item,
      float: false
    }))
    this.setState({
      list: newList
    })
  }

  bindListRoot = (element) => {
    this.setState({listRoot: element})
  }

  shouldComponentUpdate (props, state) {
    return true
  }

  render () {
    const typeMap = {
      0: Title
    }
    return (
      <div ref={this.listRoot}>
        {
          this.state.list.map(item =>
            item.type === 1
            ?
            (<Title draggable onDragStart={this.startDrag.bind(this, item)} onDragEnd={this.endDrag.bind(this, item)} block key={item.id} content={item.content}></Title>)
            :
            (<Paragraph draggable onDragStart={this.startDrag.bind(this, item)} onDragEnd={this.endDrag.bind(this, item)} block key={item.id} content={item.content}></Paragraph>)
          )
        }
        <Input placeholder="content.." onChange={this.onInput.bind(this)}/>
        <RadioGroup onChange={this.onRadioChange} value={this.state.radioValue}>
          <Radio value={1}>Title</Radio>
          <Radio value={2}>Paragraph</Radio>
        </RadioGroup>
        <Button type="primary" block onClick={this.addButton.bind(this)}>ADD</Button>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
  visibility: state.visibility
})

const mapStateToDispatch = dispatch => ({
})

export default withRouter(connect(mapStateToProps, mapStateToDispatch)(DragList))
