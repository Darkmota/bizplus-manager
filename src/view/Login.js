import React from 'react'
import { connect } from 'react-redux'
import { actionLogin } from '../redux/actionTypes'
import { withRouter } from 'react-router-dom'
import { Layout, message, div, Col, Card, Form, Icon, Input, Button, Checkbox} from 'antd'
import IO from '../utils/Mutation'
import './Login.css'
const { Content, Header, Footer } = Layout

class NormalLogin extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      id: '',
      password: ''
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
      this.props.login(values, this)
      //let res = await IO.loginAsTeacher(this.values.id, this.values.password)
      //console.log(res)
    });
  }

  onChange = async (type, event) => {
    this.setState({[type]: event.target.value})
  }

  render () {
    const { getFieldDecorator } = this.props.form
    return (
      <div className="login-container">
        <img className="login-form-img" alt="no" style={{ width: "100%", height: "100%"}} src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553769428258&di=b47ff2a6e39de73d1ce5e90b0f11733e&imgtype=0&src=http%3A%2F%2Fpic.58pic.com%2F58pic%2F15%2F68%2F59%2F71X58PICNjx_1024.jpg"></img>
        <div className="login-form-content">
          <Form onSubmit={this.handleSubmit} className="login-form">
            <div className="login-form-title-border">
              <h1 className="login-form-title">登录系统</h1>
            </div>
            <Form.Item className="login-form-input" style={{ paddingTop: 30 }}>
              {getFieldDecorator('id', {
                rules: [{ required: true, message: '请输入账号!' }],
              })(
                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入账号(123)" />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: '请输入密码！' }],
              })(
                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="请输入密码(123)" />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true,
              })(
                <Checkbox style={{ position: 'relative', right: 80 }}>记住密码</Checkbox>
              )}
              <Button block type="primary" htmlType="submit" className="login-form-button">
                登录
              </Button>
              <div className="login-form-depressed-button">
                <a href="">注册账号</a>
                &nbsp;
                <a className="login-form-forgot" href="">找回密码</a>
              </div>
            </Form.Item>
          </Form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  isLogin: state.isLogin,
  user: state.user
})

const mapStateToDispatch = dispatch => ({
  login: async (e, ctx) => {
    try {
      let res = await IO.login(e.id, e.password)
      if (res.data.errors) {
        message.error(res.data.errors[0].message)
      } else {
        dispatch(actionLogin({
          token: res.headers['set-token']
        }))
        ctx.props.history.push('/index')
      }
    } catch (e) {
      message.error(e)
    }
  }
})

const Login = Form.create({ name: 'login' })(NormalLogin)

export default withRouter(connect(mapStateToProps, mapStateToDispatch)(Login))
