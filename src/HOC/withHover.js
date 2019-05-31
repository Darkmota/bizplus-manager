import React, { Component } from 'react'
import ReactDOM from 'react-dom'

const withHover = function (WrappedComponent) {
  return class extends Component {
    onMouseEnterHandler = () => {
      this.setState({isHover: true})
    }

    onMouseLeaveHandler = () => {
      this.setState({isHover: false})
    }

    state = {
      isHover: false
    }

    componentDidMount () {
      this.nv = ReactDOM.findDOMNode(this)
      this.nv.addEventListener('mouseenter', this.onMouseEnterHandler)
      this.nv.addEventListener('mouseleave', this.onMouseLeaveHandler)
    }

    componentWillUnmount () {
      this.nv.removeEventListener('mouseenter')
      this.nv.removeEventListener('mouseleave')
    }

    render() {
      return (
        <WrappedComponent isHover={this.state.isHover} {...this.props}></WrappedComponent>
      )
    }
  }
}

export default withHover
