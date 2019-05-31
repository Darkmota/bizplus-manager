import React, { Component } from 'react'
import { Row, Col, Button, Tabs } from 'antd'
import { connect } from 'react-redux'
import { blue } from '@ant-design/colors'
import InputForm from './InputForm'
import { withDataForm } from '../HOC'

const { TabPane } = Tabs

const loader = node => {
  let returnValue = {}
  for (let key in node) {
    let value = node[key]
    if (typeof value === 'string') {
      returnValue[key] = value
    }
  }
  return returnValue
}

const saver = (data, newData) => {
  for (let key in data) {
    let value = data[key]
    if (typeof value === 'string') {
      data[key] = newData[key]
    }
  }
}

class MenuTranslation extends Component {
  state = {
    editCounter: 0,
    scopedData: { ...this.props.scopedData },
    restoreSymbol: this.props.restoreSymbol
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      scopedData: { ...nextProps.scopedData },
      restoreSymbol: nextProps.restoreSymbol,
      saveSymbol: nextProps.saveSymbol
    })
  }

  onChange = async (key, value, counterDelta) => {
    let newScopedData = { ...this.state.scopedData }
    newScopedData[this.props.currentLang][key] = value
    this.props.onEdit(counterDelta)
    this.setState({
      scopedData: newScopedData
    })
  }

  render() {
    let tabPanes = []
    console.log(this.state.scopedData)
    for (let eachLang of this.props.allLangs) {
      let inputs = []
      for (let key in this.state.scopedData[eachLang]) {
        let value = this.state.scopedData[eachLang][key]
        inputs.push(
          <Row gutter={8} key={key}>
            <Col span={6} offset={2}>
              <p style={{textAlign: 'end', position: 'relative', bottom: '-4px'}}>{key.replace(/_/g, ' ')}</p>
            </Col>
            <Col span={8}>
              <InputForm restoreSymbol={this.state.restoreSymbol} saveSymbol={this.state.saveSymbol} defaultValue={value} onChange={this.onChange.bind(this, key)}></InputForm>
            </Col>
          </Row>
        )
      }
      tabPanes.push(<TabPane tab={eachLang} key={eachLang}>{inputs}</TabPane>)
    }

    return (
      <>
        <Tabs defaultActiveKey="jp" onChange={this.props.changeLang.bind(this)}>
          {tabPanes}
        </Tabs>
        <Button type="primary" disabled={!this.props.editCounter} block onClick={this.props.onSave.bind(this, { ...this.state.scopedData })}>save</Button>
        <Button type="dashed" disabled={!this.props.editCounter} block onClick={this.props.onRestore.bind(this)}>restore</Button>
      </>
    )
  }
}

export default withDataForm(loader, saver)(MenuTranslation)
