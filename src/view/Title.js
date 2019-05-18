import React, { Component } from 'react'
import { Layout, Menu, Breadcrumb, Icon } from 'antd'
import { connect } from 'react-redux'
import { withRouter, Route, Link } from 'react-router-dom'

class Title extends Component {
  render () {
    return (
      <div>
        <h2 style={{color: "#000088", textAlign: 'left'}}>#{this.props.content}</h2>
      </div>
    )
  }
}

export default withRouter(Title)