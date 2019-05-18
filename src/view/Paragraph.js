import React, { Component } from 'react'
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { withHover, withDrag } from '../HOC'

class Paragraph extends Component {
  render () {
    const hoverBorder = this.props.isHover ? '2px solid #40a9ff' : '2px solid rgba(0,0,0,0)'
    const dragBackgroundColor = this.props.isDrag ? 'rgba(32, 32, 32, 0.5)' : 'rgba(0, 0, 255, 0)'
    return (
      <div draggable style={{ boxSizing: 'border-box', border: hoverBorder, cursor: 'pointer', backgroundColor: dragBackgroundColor }}>
        <p style={{color: "#000000", fontSize: 15, textAlign: 'left', textIndent: '2em'}}>{this.props.content}</p>
      </div>
    )
  }
}

export default withDrag(withHover(withRouter(Paragraph)))
