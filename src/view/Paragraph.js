import React, { Component } from 'react'
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import { connect } from 'react-redux'
import { withRouter, Route, Link } from 'react-router-dom'

class Paragraph extends Component {
  render () {
    return (
      <div>
        <p style={{color: "#000000", fontSize: 15, textAlign: 'left'}}>{this.props.content}</p>
      </div>
    )
  }
}

export default withRouter(Paragraph)
