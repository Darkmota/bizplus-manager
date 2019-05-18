import React, { Component } from 'react'
import ReactDOM from 'react-dom'

const withDrag = function (WrappedComponent) {
  return class extends Component {
    constructor(props) {
      super(props)
    }

    onDragStartHandler = () => {
      console.log('dragstart')
      this.setState({isDrag: true})
    }

    onDragEndHandler = () => {
      console.log('dragend')
      this.setState({isDrag: false})
    }

    state = {
      isDrag: false
    }

    componentDidMount () {
      this.nv = ReactDOM.findDOMNode(this)
      this.nv.addEventListener('dragstart', this.onDragStartHandler)
      this.nv.addEventListener('dragend', this.onDragEndHandler)
    }

    componentWillUnmount () {
      this.nv.removeEventListener('dragstart')
      this.nv.removeEventListener('dragend')
    }
    render() {
      return (
        <WrappedComponent isDrag={this.state.isDrag} {...this.props}></WrappedComponent>
      )
    }
  }
}

export default withDrag
