import React, { Component } from 'react'
import { Row, Col, Layout, Menu, Breadcrumb, Icon, Button, Input, Typography, Divider } from 'antd'
import { connect } from 'react-redux'
import { actionLogout, actionInitData, actionChangeLang } from '../redux/actionTypes'
import { withRouter, Route, Link } from 'react-router-dom'
import './Dashboard.css'
import { baidu } from 'translation.js'
import StringForm from '../component/StringForm'
import ObjectForm from '../component/ObjectForm'
import ListForm from '../component/ListForm'
import MenuTranslation from '../component/MenuTranslation'
import Mutation from '../utils/Mutation'
import schema from '../utils/schema'
import { INSERT, DELETE, EXCHANGE, UPDATE, APPEND } from '../utils/method'

const { Header, Content, Footer, Sider } = Layout
const { Title, Paragraph, Text } = Typography
const SubMenu = Menu.SubMenu;

class Dashboard extends React.Component {
  state = {
    collapsed: false,
    lang: 'cn',
    schema: {},
    data: {
      cn: {},
      en: {},
      jp: {}
    }
  }
  shouldComponentUpdate (props, state) {
    return true
  }
  catchBubble = async (method, keyArray, value) => {
    let newObj = Object.assign({}, this.state.data)
    for (let lang of ['jp', 'cn', 'en']) {
      let targetValue = value
      if (lang !== this.state.lang) {
        targetValue = lang + value
      }
      let { parent, childKey } = this.getNode(newObj[lang], keyArray)
      let child = parent[childKey]
      switch (method) {
        case APPEND:
          child.push(targetValue)
          break
        case INSERT:
          parent.splice(childKey, 0, targetValue)
          break
        case DELETE:
          parent.splice(childKey)
          break
        default:
          break
      }
    }
    this.setState({data: newObj})
  }


  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed })
  }

  getNode = (parent, keyArray) => {
    let childKey = keyArray[keyArray.length - 1]
    keyArray.splice(keyArray.length - 1, 1)
    for (let key of keyArray) {
      console.log(parent, key)
      parent = parent[key]
    }
    return {
      parent,
      childKey
    }
  }

  changeLang = lang => {
    this.setState({lang})
  }

  appendData = (path, value) => {

  }

  async componentDidMount () {
    let data = await Mutation.fetchData()
    console.log(data)
    this.props.initData(data)
  }

  onChange = async (key, event) => {
    console.log(key, event.target.value)
  }

  onMenuChange = async event => {
    this.props.history.push('/dashboard/'+ event.keyPath.join('/'))
  }

  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" onClick={this.onMenuChange}>
            <Menu.Item key="menu_translation">
              <Icon type="translate" />
              <span>Menu Translation</span>
            </Menu.Item>
            <SubMenu
              key="sub1"
              title={
                <span>
                  <Icon type="user" />
                  <span>User</span>
                </span>
              }
            >
              <Menu.Item key="3">Tom</Menu.Item>
              <Menu.Item key="4">Bill</Menu.Item>
              <Menu.Item key="5">Alex</Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub2"
              title={
                <span>
                  <Icon type="team" />
                  <span>Team</span>
                </span>
              }
            >
              <Menu.Item key="6">Team 1</Menu.Item>
              <Menu.Item key="8">Team 2</Menu.Item>
            </SubMenu>
            <Menu.Item key="9">
              <Icon type="file" />
              <span>File</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }} >
            <Button onClick={this.props.logout.bind(this)}>Logout</Button>
          </Header>
          <Content style={{ margin: '0 16px' }}>
            <Route exact path="/dashboard/menu_translation" component={MenuTranslation}></Route>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  data: state.lang.data
})

const mapStateToDispatch = dispatch => ({
  logout () {
    dispatch(actionLogout())
  },
  changeLang (newLang) {
    dispatch(actionChangeLang(newLang))
  },
  initData (data) {
    dispatch(actionInitData(data))
  }
})

export default withRouter(connect(mapStateToProps, mapStateToDispatch)(Dashboard))
