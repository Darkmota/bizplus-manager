import React, { Component } from 'react'
import { Layout, Menu, Breadcrumb, Icon } from 'antd'
import { connect } from 'react-redux'
import { withRouter, Route, Link } from 'react-router-dom'
import { withDrag, withHover } from '../HOC'
import Title from './Title'
import Paragraph from './Paragraph'

class DragItem extends Component {
  render () {
    return (
      this.props.item.type === 1
      ?
      (<Title visible={!this.props.item.float} content={this.props.item.content}></Title>)
      :
      (<Paragraph visible={!this.props.item.float} content={this.props.item.content}></Paragraph>)
    )
  }
}

export default withDrag(withHover(DragItem))
