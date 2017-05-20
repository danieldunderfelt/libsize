import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import Input from '../components/Input'
import actions from '../actions'
import History from './History'

@inject('store')
@observer
class WeighUrl extends Component {
  actions = (actions(this.props.store))

  onSubmit = input => {
    this.actions.weighInput(input)
    this.actions.handleInput('')
  }

  render() {

    return (
      <div>
        <header>
          <h1>
            Libsize
          </h1>
          <Input
            onSubmit={ this.onSubmit } />
        </header>
        <History />

        <style jsx>{`
          header {
            margin-bottom: 3em;
            display: flex;
            flex-direction: column;
          }

          h1 {
            text-align: center;
            margin: 0 .25em .5em 0;
          }

          @media (min-width: 875px) {
            header {
              flex-direction: row;
              align-items: flex-end;
            }

            h1 {
              margin: 0 .25em 0 0;
            }
          }
        `}</style>
      </div>
    )
  }
}

export default WeighUrl

