import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import Input from '../components/Input'
import actions from '../actions'
import History from './History'

@inject('store')
@observer
class WeighUrl extends Component {
  actions = (actions(this.props.store))

  onSubmit = url => {
    this.actions.weighUrl(url)
    this.actions.handleInput('')
  }

  render() {

    return (
      <div>
        <Input
          onSubmit={ this.onSubmit } />
        <History />
      </div>
    )
  }
}

export default WeighUrl

