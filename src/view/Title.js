import React, { Component } from 'react'
import { Layout, Menu, Breadcrumb, Icon } from 'antd'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { withHover, withDrag } from '../HOC'

class Title extends Component {
  render () {
    const hoverBorder = this.props.isHover ? '2px solid #40a9ff' : '2px solid rgba(0,0,0,0)'
    const dragBackgroundColor = this.props.isDrag ? 'rgba(32, 32, 32, 0.5)' : 'rgba(0, 0, 255, 0)'
    const opacity = this.props.visible ? 1 : 0
    return (
      <div draggable style={{opacity: opacity, cursor: 'pointer', border: hoverBorder, backgroundColor: dragBackgroundColor }}>
        <h2 style={{color: "#000088", textAlign: 'left'}}>#{this.props.content}</h2>
      </div>
    )
  }
}

export default withDrag(withHover(withRouter(Title)))
