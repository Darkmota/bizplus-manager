import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { actionChangeLang, actionSaveData } from '../redux/actionTypes'


const withLang = function (WrappedComponent, loader, saver) {
  let ReturnWrappedComponent = class extends Component {
    state = {
      scopedData: {}
    }
    componentDidMount () {
      let scopedData = {}
      for (let lang of this.props.allLangs) {
        scopedData[lang] = loader(this.props.data[lang])
      }
      this.setState({ scopedData: { ...scopedData } })
    }

    onSave = newScopedData => {
      console.log('newScopedData', newScopedData)
      let data = { ...this.props.data }
      for (let lang of this.props.allLangs) {
        saver(data[lang], newScopedData[lang])
      }
      this.props.save(data)
    }

    render() {
      return (
        <WrappedComponent onSave={this.onSave.bind(this)} scopedData={this.state.scopedData} {...this.props}></WrappedComponent>
      )
    }
  }
  return connect(mapStateToProps, mapStateToDispatch)(ReturnWrappedComponent)
}

const mapStateToProps = state => ({
  user: state.user,
  allLangs: state.lang.allLangs,
  currentLang: state.lang.currentLang,
  data: state.lang.data
})

const mapStateToDispatch = dispatch => ({
  changeLang (newLang) {
    dispatch(actionChangeLang(newLang))
  },
  save (data) {
    dispatch(actionSaveData(data))
  }
})

export default withLang
