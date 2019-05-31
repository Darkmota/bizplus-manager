import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { actionChangeLang, actionSaveData } from '../redux/actionTypes'
import { message } from 'antd'

const createWithDataForm = function (loader, saver) {
  return function (WrappedComponent) {
    let ReturnWrappedComponent = class extends Component {
      state = {
        restoreSymbol: Symbol(),
        saveSymbol: Symbol(),
        editCounter: 0,
        scopedData: {}
      }
  
      componentDidMount () {
        let scopedData = {}
        for (let lang of this.props.allLangs) {
          scopedData[lang] = loader(this.props.data[lang])
        }
        this.setState({ scopedData: { ...scopedData } })
      }
      
      onSave = async newScopedData => {
        let data = { ...this.props.data }
        for (let lang of this.props.allLangs) {
          saver(data[lang], newScopedData[lang])
        }
        try {
          await this.props.save(data)
          message.info('Save succeed!')
          this.setState({ saveSymbol: Symbol(), editCounter: 0 })
        } catch (err) {
          message.error('Save failed')
        }
      }
  
      onRestore = () => {
        this.setState({ restoreSymbol: Symbol(), editCounter: 0 })
      }
      
      onEditCounterChange = delta => {
        this.setState({ editCounter: this.state.editCounter + delta })
      }

      render () {
        return (
          <WrappedComponent onSave={this.onSave} onEdit={this.onEditCounterChange} onRestore={this.onRestore} { ...this.state } { ...this.props }></WrappedComponent>
        )
      }
    }
    return withRouter(connect(mapStateToProps, mapStateToDispatch)(ReturnWrappedComponent))
  }
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

export default createWithDataForm
