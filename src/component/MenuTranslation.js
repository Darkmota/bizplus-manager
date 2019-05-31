import React, { Component } from 'react'
import { Row, Col, Layout, Menu, Breadcrumb, Icon, Button, Input, Typography, Divider, Tabs } from 'antd'
import { connect } from 'react-redux'
import { actionSaveTranslation, actionChangeLang } from '../redux/actionTypes'
import { withRouter, Route, Link } from 'react-router-dom'
import { baidu } from 'translation.js'
import { blue } from '@ant-design/colors'
import InputForm from './InputForm'
import { withLang } from '../HOC'

const { Header, Content, Footer, Sider } = Layout
const { Title, Paragraph, Text } = Typography
const SubMenu = Menu.SubMenu;
const { TabPane } = Tabs

class MenuTranslation extends Component {
  state = {
    editedCounter: 0,
    scopedData: { ...this.props.scopedData },
    restoreSymbol: Symbol()
  }

  componentWillReceiveProps (nextProps) {
    this.setState({ scopedData: { ...nextProps.scopedData } })
  }

  onChange = async (lang, key, value, counterDelta) => {
    let newScopedData = { ...this.state.scopedData }
    newScopedData[lang][key] = value
    this.setState({
      editedCounter: this.state.editedCounter + counterDelta,
      scopedData: newScopedData
    })
  }

  onTabChange = newLang => {
    this.props.changeLang(newLang)
  }

  onRestore = () => {
    this.setState({restoreSymbol: Symbol(), editedCounter: 0})
  }

  render() {
    let tabPanes = []
    console.log(this.state.scopedData)
    for (let eachLang of this.props.allLangs) {
      let inputs = []
      for (let key in this.state.scopedData[eachLang]) {
        let value = this.state.scopedData[eachLang][key]
        inputs.push(
          <Row gutter={8} key={key}>
            <Col span={6} offset={2}>
              <p style={{textAlign: 'end', position: 'relative', bottom: '-4px'}}>{key.replace(/_/g, ' ')}</p>
            </Col>
            <Col span={8}>
              <InputForm restoreSymbol={this.state.restoreSymbol} defaultValue={value} onChange={this.onChange.bind(this, eachLang, key)}></InputForm>
            </Col>
          </Row>
        )
      }
      tabPanes.push(<TabPane tab={eachLang} key={eachLang}>{inputs}</TabPane>)
    }
    return (
      <>
        <Tabs defaultActiveKey="jp" onChange={this.onTabChange}>
          {tabPanes}
        </Tabs>
        <Button type="primary" disabled={!this.state.editedCounter} block onClick={this.props.onSave.bind(this, { ...this.state.scopedData })}>save</Button>
        <Button type="dashed" disabled={!this.state.editedCounter} block onClick={this.onRestore}>restore</Button>
      </>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
  allLangs: state.lang.allLangs,
  currentLang: state.lang.currentLang,
  data: state.lang.data
})

const mapStateToDispatch = dispatch => ({
  changeLang (newLang) {
    dispatch(actionChangeLang(newLang))
  }
})

const loader = node => {
  let returnValue = {}
  for (let key in node) {
    let value = node[key]
    if (typeof value === 'string') {
      returnValue[key] = value
    }
  }
  return returnValue
}

const saver = (data, newData) => {
  for (let key in data) {
    let value = data[key]
    if (typeof value === 'string') {
      console.log(data[key], newData[key])
      data[key] = newData[key]
    }
  }
}

export default withLang(withRouter(connect(mapStateToProps, mapStateToDispatch)(MenuTranslation)), loader, saver)
