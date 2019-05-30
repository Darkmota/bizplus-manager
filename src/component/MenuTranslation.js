import React, { Component } from 'react'
import { Row, Col, Layout, Menu, Breadcrumb, Icon, Button, Input, Typography, Divider, Tabs } from 'antd'
import { connect } from 'react-redux'
import { actionSaveTranslation, actionChangeLang } from '../redux/actionTypes'
import { withRouter, Route, Link } from 'react-router-dom'
import { baidu } from 'translation.js'
import { blue } from '@ant-design/colors'
import InputForm from './InputForm'

const { Header, Content, Footer, Sider } = Layout
const { Title, Paragraph, Text } = Typography
const SubMenu = Menu.SubMenu;
const { TabPane } = Tabs

class MenuTranslation extends Component {
  state = {
    editedCounter: 0,
    scopedData: {},
    restoreSymbol: Symbol()
  }

  componentDidMount () {
    let scopedData = {}
    let currentLangData = this.props.data[this.props.currentLang]
    console.log(this.props.data, currentLangData)
    for (let key in currentLangData) {
      let value = currentLangData[key]
      console.log(key, value)
      if (typeof value === 'string') {
        scopedData[key] = value
      }
    }
    this.setState({ scopedData })
  }

  onChange = async (key, value, counterDelta) => {
    let newScopedData = Object.assign(this.state.scopedData)
    newScopedData[key] = value
    this.setState({
      editedCounter: this.state.editedCounter + counterDelta,
      scopedData: newScopedData
    })
  }

  onTabChange = newLang => {
    console.log({newLang})
    this.props.changeLang(newLang)
  }

  onSave = () => {
  }
  
  onRestore = () => {
    this.setState({restoreSymbol: Symbol()})
  }

  render() {
    let tabPanes = []
    console.log(this.state.scopedData)
    for (let eachLang of this.props.allLangs) {
      let inputs = []
      for (let key in this.state.scopedData) {
        let value = this.state.scopedData[key]
        inputs.push(
          <Row gutter={8} key={key}>
            <Col span={6} offset={2}>
              <p style={{textAlign: 'end', position: 'relative', bottom: '-4px'}}>{key.replace(/_/g, ' ')}</p>
            </Col>
            <Col span={8}>
              <InputForm restoreSymbol={this.state.restoreSymbol} defaultValue={value} onChange={this.onChange.bind(this, key)}></InputForm>
            </Col>
          </Row>
        )
      }
      tabPanes.push(<TabPane tab={eachLang} key={eachLang}>{inputs}</TabPane>)
    }
    return (
      <>
        <Tabs defaultActiveKey="1" onChange={this.onTabChange}>
          {tabPanes}
        </Tabs>
        <Button type="primary" disabled={!this.state.editedCounter} block onClick={this.onSave}>save</Button>
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

export default withRouter(connect(mapStateToProps, mapStateToDispatch)(MenuTranslation))
