import React, { Component } from 'react'
import { Button, Input, message } from 'antd'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import DragItem from './DragItem'
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
    ghost: null,
    list: [{
      type: 1,
      content: '软件开发业务',
      float: true,
      id: -1
    }, {
      type: 2,
      content: `主要特征
      拥有大量具备5年以上日企系统开发经验的技术者
      通过与关联企业合作，有规模扩大的可能
      拥有具备多国语言能力的技术者，据有无国境障碍交流实现开发的可能
      具备大量海外开发技术
      系统构筑业务
      拥有从系统咨询到要件定义，设计，制造，测试，运用维护等全程进行提案的能力
      服务业务`,
      float: false,
      id: -2
    }, {
      type: 1,
      content: '咨询业务',
      float: false,
      id: -3
    }, {
      type: 2,
      content: `作为日本和亚洲各国的桥梁，面向企业提供战略咨询服务。
      扩大日本企业的亚洲市场销路
      企业的M & A支援
      为亚洲企业提供进入日本・营业战略伙伴
      教育、医疗、大型商业设施等的运营`,
      float: false,
      id: -4
    },  {
      type: 1,
      content: '外国人才派遣事业',
      float: false,
      id: -5
    }, {
      type: 2,
      content: `Bizplus，为了顾客的业务推进以及业务支持提供了大量的外国技术人员。
      2015年，取得特定劳动派遣事业许可到现在，在日本的IT领域开展外国技术人员的派遣业务。
      派遣内容 SE,PG,BSE
      派遣领域 制造 金融 证券 物流 通信
      派遣地点 东京 大阪 名古屋 神户 长野 滨松`,
      float: false,
      id: -6
    },],
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

  render () {
    return (
      <div ref={this.listRoot}>
        {
          this.state.ghost
          ?
          (<DragItem item={this.state.ghost}></DragItem>)
          :
          <></>
        }
        {
          this.state.list.map(item =>
            <DragItem draggable key={item.id} item={item} onDragStart={this.startDrag.bind(this, item)} onDragEnd={this.endDrag.bind(this, item)}></DragItem>
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
