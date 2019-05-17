import React from 'react'
import logo from './logo.svg'
import './App.css'
import { connect } from 'react-redux'
import { Menu, Icon } from 'antd'
import { withRouter, Route, Link } from 'react-router-dom'

class App extends React.Component {
  constructor (props) {
    super(props)
  }
  render () {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          { this.props.user.username }
        </header>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
})

const mapStateToDispatch = dispatch => ({
})

export default withRouter(connect(mapStateToProps, mapStateToDispatch)(App))
