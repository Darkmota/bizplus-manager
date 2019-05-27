import React, { Component } from 'react'
import { Layout, Menu, Breadcrumb, Icon, Button, Input } from 'antd'
import { connect } from 'react-redux'
import { actionLogout } from '../redux/actionTypes'
import { withRouter, Route, Link } from 'react-router-dom'
import './Dashboard.css'
import DragList from './DragList'
import Mutation from '../utils/Mutation';

const { Header, Content, Footer, Sider } = Layout
const SubMenu = Menu.SubMenu;

class Dashboard extends React.Component {
  state = {
    collapsed: false,
    lang: 'cn',
    data: {
      cn: {},
      en: {},
      jp: {}
    }
  }

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed })
  }

  getNode = (node, path) => {
    let currentNode = node
    let keyArray = path.split('.').slice(0, keyArray.length - 1)
    for (let key of keyArray) {
      currentNode = node[key]
    }
    return currentNode
  }

  changeLang = lang => {
    this.setState(lang)
  }

  changeData = (path, value) => {
    let newObj = Object.assign({}, this.state.data)
    let node = this.getNode(newObj, path)
    let key = path.split('.')[this]
    node[key] = value
  }

  appendData = (path, value) => {

  }

  async componentWillMount () {
    this.setState({
      data: await Mutation.fetchData()
    })
  }

  onChange = async (key, event) => {
    console.log(key, event.target.value)
  }

  render() {
    let menu = []
    for (let key in this.state.data) {
      menu.push(
        <Menu.Item key={key} onClick={this.changeLang.bind(this, key)}>
          <Icon type="pie-chart" />
          <span>{key}</span>
        </Menu.Item>
      )
    }
    let tree = []
    let currentLangRoot = this.state.data[this.state.lang]
    for (let key in currentLangRoot) {
      tree.push(<Input placeholder={`${this.state.locale}.${this.state}`} onChange={this.onChange.bind(this, key)}/>)
    }
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            {menu}
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
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            {tree}
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  visibility: state.visibility
})

const mapStateToDispatch = dispatch => ({
  logout () {
    dispatch(actionLogout())
  }
})

export default withRouter(connect(mapStateToProps, mapStateToDispatch)(Dashboard))
