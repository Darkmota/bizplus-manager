import React, { Component } from 'react'
import { Layout, Menu, Breadcrumb, Icon } from 'antd'
import { connect } from 'react-redux'
import { withRouter, Route, Link } from 'react-router-dom'
import { withDrag, withHover } from '../HOC'
import Title from './Title'
import Paragraph from './Paragraph'

class DragItem extends Component {
  onDragStartHandler = e => {
    this.props.onDragStart(e)
  }
  onDragEndHandler = e => {
    this.props.onDragEnd(e)
  }
  render () {
    return (
      this.props.item.type === 1
      ?
      (<Title onDragStart={this.onDragStartHandler} onDragEnd={this.onDragEndHandler} visible={!this.props.item.float} content={this.props.item.content}></Title>)
      :
      (<Paragraph onDragStart={this.onDragStartHandler} onDragEnd={this.onDragEndHandler} visible={!this.props.item.float} content={this.props.item.content}></Paragraph>)
    )
  }
}

export default DragItem
