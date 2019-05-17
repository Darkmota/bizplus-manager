import React from 'react'
import logo from './logo.svg'
import './App.css'
import { connect } from 'react-redux'
import { Menu, Icon } from 'antd'
import { withRouter, Route, Link } from 'react-router-dom'
import Login from './view/Login'
import Dashboard from './view/Dashboard'

class App extends React.Component {
  constructor (props) {
    super(props)
    console.log(props)
  }
  render () {
    return (
      <div className="App">
        <Route path="/login" component={Login}></Route>
        <Route path="/dashboard" component={Dashboard}></Route>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  visibility: state.visibility,
  p: state.p
})

const mapStateToDispatch = dispatch => ({
})

export default withRouter(connect(mapStateToProps, mapStateToDispatch)(App))
