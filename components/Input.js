import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import actions from '../actions'

@inject('store')
@observer
class Input extends Component {
  actions = (actions(this.props.store))

  onSubmit = e => {
    e.preventDefault()
    const { weighInput } = this.props.store
    this.props.onSubmit(weighInput)
  }

  render() {
    const { weighInput } = this.props.store

    return (
      <div className="input-form">
        <form
          method="get"
          action="/"
          onSubmit={ this.onSubmit }>
          <div className="input-wrapper">
            <input
              className="input-input"
              value={ weighInput }
              onInput={ e => this.actions.handleInput(e.target.value)}
              name="input"
              placeholder="npm package name or url..."
              type="text" />
            <button
              className="button"
              type="submit">Weigh</button>
          </div>
        </form>
        <style jsx>{`
          .input-form {
            width: 100%;
          }

          .input-wrapper {
            display: flex;
            align-items: flex-end;
          }

          .input-input {
            padding: .5rem;
            font-size: 1em;
            display: block;
            border: 0;
            flex: 1 1 auto;
          }

          .button {
            appearance: none;
            padding: .5rem 1rem;
            border: 0;
            background: #000000;
            color: white;
            display: block;
            font-family: inherit;
            font-size: 1em;
            font-weight: 700;
          }

          @media (min-width: 875px) {
            .input-input, .button {
              font-size: 1.4em;
            }
          }
        `}</style>
      </div>
    )
  }
}

export default Input

