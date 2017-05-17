import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import actions from '../actions'

@inject('store')
@observer
class Input extends Component {
  actions = (actions(this.props.store))

  onSubmit = e => {
    e.preventDefault()
    const { weighUrl } = this.props.store
    this.props.onSubmit(weighUrl)
  }

  render() {
    const { weighUrl } = this.props.store

    return (
      <div className="input-form">
        Enter the URL to the file you want to weigh:
        <form
          method="get"
          action="/"
          onSubmit={ this.onSubmit }>
          <p>
            <input
              className="url-input"
              value={ weighUrl }
              onInput={ e => this.actions.handleInput(e.target.value)}
              name="url"
              type="url" />
            <button
              className="button"
              type="submit">Weigh</button>
          </p>
        </form>
        <style jsx>{`
          .url-input {
            padding: .5rem;
            font-size: 1.2em;
            border: 0;
          }
          .button {
            appearance: none;
            padding: .5rem 1rem;
            border: 0;
            background: #0099ff;
            color: white;
            font-family: inherit;
            font-size: 1.2em;
            font-weight: 700;
          }
        `}</style>
      </div>
    )
  }
}

export default Input

