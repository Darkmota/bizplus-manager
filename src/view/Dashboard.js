import React, { Component } from 'react'
import { Row, Col, Layout, Menu, Breadcrumb, Icon, Button, Input, Typography, Divider } from 'antd'
import { connect } from 'react-redux'
import { actionLogout } from '../redux/actionTypes'
import { withRouter, Route, Link } from 'react-router-dom'
import './Dashboard.css'
import { baidu } from 'translation.js'
import StringForm from '../component/StringForm'
import ObjectForm from '../component/ObjectForm'
import ListForm from '../component/ListForm'
import Mutation from '../utils/Mutation';
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
  
  catchBubble = async (method, keyArray, value) => {
    let newObj = Object.assign({}, this.state.data)
    for (let lang of ['jp', 'cn', 'en']) {
      let targetValue = value
      if (lang !== this.state.lang) {
        let res = await baidu.translate({
          text: targetValue,
          from: this.state.lang,
          to: lang
        })
        targetValue = res.result[0]
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
    this.setState({
      data: data
    })
  }

  onChange = async (key, event) => {
    console.log(key, event.target.value)
  }

  parse (documentNode, schemaNode, depth) {
    let returnValue
    let space = ''
    for (let i = 0; i < depth; ++i) {
      space += '| '
    }
    console.log(`${space}\x1b[${31+depth}mD${depth}\x1b[0m `, JSON.stringify(documentNode))
    console.log(`${space}\x1b[${31+depth}mS${depth}\x1b[0m `, schemaNode)
    if (schemaNode === Number || schemaNode === String || schemaNode === Boolean || schemaNode === Date) {
      returnValue = schemaNode(documentNode)
    } else if (schemaNode instanceof Array) {
      returnValue = documentNode.map(arrayElement => this.parse(arrayElement, schemaNode[0], depth+1))
    } else if (typeof schemaNode === 'object') {
      if (schemaNode.type && schemaNode.default !== undefined) {
        if (documentNode) {
          returnValue = this.parse(documentNode, schemaNode.type, depth+1)
        } else if (typeof schemaNode.default === 'function') {
          returnValue = schemaNode.default(documentNode)
        } else {
          returnValue = schemaNode.default
        }
      } else {
        returnValue = {}
        for (let key in schemaNode) {
          returnValue[key] = this.parse(documentNode[key], schemaNode[key], depth+1)
        }
      }
    }
    console.log(`${space}\x1b[${31+depth}m${depth}=>\x1b[0m `, JSON.stringify(returnValue))
    return returnValue
  }

  render() {
    let menu = []
    console.log(this.state.data)
    for (let key in this.state.data) {
      menu.push(
        <Menu.Item key={key} onClick={this.changeLang.bind(this, key)}>
          <Icon type="pie-chart" />
          <span>{key}</span>
        </Menu.Item>
      )
    }
    /*
    let tree = []
    let currentLangRoot = this.state.data[this.state.lang]
    for (let key in currentLangRoot) {
      let sonNode = currentLangRoot[key]
      if (typeof sonNode === 'string') {
        tree.push(
          <Row>
            <Col span="4">
              <Text>{sonNode}</Text>
            </Col>
            <Col span="20">
              <Input defaultValue={sonNode} placeholder={`${this.state.lang}.${currentLangRoot[key]}`} onChange={this.onChange.bind(this, key)}/>
            </Col>
          </Row>
        )
      }
      else if (sonNode instanceof Array) {

      }
    }
    */
    /*
    let jsx = []
    for (let key in this.state.data[this.state.lang]) {
      let childData = this.state.data[this.state.lang][key]
      let ChildComponent
      if (childData instanceof Array) {
        ChildComponent = ListForm
      } else if (typeof childData === 'object') {
        ChildComponent = ObjectForm
      } else {
        ChildComponent = StringForm
      }
      jsx.push(<ChildComponent keyArray={[key]} onBubble={this.catchBubble.bind(this)} data={childData}></ChildComponent>)
    }
    */
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
            <ObjectForm keyArray={[]} onBubble={this.catchBubble.bind(this)} data={this.state.data[this.state.lang]}></ObjectForm>
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
