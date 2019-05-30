import React, { Component } from 'react'
import { Row, Col, Layout, Menu, Breadcrumb, Icon, Button, Input, Typography, Divider, Tabs } from 'antd'
import { connect } from 'react-redux'
import { actionLogout } from '../redux/actionTypes'
import { withRouter, Route, Link } from 'react-router-dom'
import { baidu } from 'translation.js'
import { blue } from '@ant-design/colors'
import InputForm from './InputForm'

const { Header, Content, Footer, Sider } = Layout
const { Title, Paragraph, Text } = Typography
const SubMenu = Menu.SubMenu;
const { TabPane } = Tabs

class MenuTranslation extends React.Component {
  state = {
    tab: 'jp'
  }
  onChange = async (key, event) => {
    console.log(key, event.target.value)
  }

  onTabChange = event => {
    this.setState({tab: event})
  }
  onSave = () => {

  }

  render() {
    let tabPanes = []
    for (let lang of this.props.lang.allLangs) {
      let inputs = []
      for (let key in this.props.data[lang]) {
        let value = this.props.data[lang][key]
        if (typeof value === 'string') {
          inputs.push(
            <Row gutter={8} key={key}>
              <Col span="6" offset="2">
                <p style={{textAlign: 'end', position: 'relative', bottom: '-4px'}}>{key.replace(/_/g, ' ')}</p>
              </Col>
              <Col span="8">
                <InputForm defaultValue={value} onChange={this.onChange.bind(this, key)}></InputForm>
              </Col>
            </Row>
          )
        }
      }
      tabPanes.push(<TabPane tab={lang} key={lang}>{inputs}</TabPane>)
    }
    return (
      <>
        <Tabs defaultActiveKey="1" onChange={this.onTabChange}>
          {tabPanes}
        </Tabs>
        <Button type="primary" onClick={this.onSave}>save</Button>
      </>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
  lang: state.lang,
  data: state.lang.data
})

const mapStateToDispatch = dispatch => ({
  changeLang (newLang) {
    dispatch({
      currentLang: newLang
    })
  }
})

export default withRouter(connect(mapStateToProps, mapStateToDispatch)(MenuTranslation))
