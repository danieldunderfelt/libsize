import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import _ from 'lodash'
import prettyBytes from '../helpers/prettyBytes'
import actions from '../actions'

@inject('store')
@observer
class History extends Component {
  actions = (actions(this.props.store))

  render() {
    const { results } = this.props.store

    return (
      <div>
        <ul className="results">
          { _.reverse(results.slice()).map(result => (
            <li className="size-result" key={ result.input }>
              <h4>
                { result.input }
              </h4>
              <p>
                Size: <strong>{ prettyBytes(result.size) }</strong>
              </p>
              <p>
                Gzipped: <strong>{ prettyBytes(result.gzipSize) }</strong>
              </p>
              <p>
                <button onClick={ e => this.actions.removeItem(result.input) }>
                  Remove
                </button>
              </p>
            </li>
          )) }
        </ul>
        <div className="total">
          <p>
            Total: <strong>{ prettyBytes(results.reduce((sum, result) => sum + result.size, 0)) }</strong>
          </p>
          <p>
            Total gzipped: <strong>{ prettyBytes(results.reduce((sum, result) => sum + result.gzipSize, 0)) }</strong>
          </p>
        </div>

        <style jsx>{`
          .results {
            list-style: none;
            margin: 0;
            padding: 0;
          }

          .size-result {
            padding: 2em;
            margin-bottom: 1em;
            background: #5a5a5a;
          }

          .size-result h4 {
            margin-top: 0;
          }

          .size-result p {
            margin: 0;
          }

          .total {
            margin-top: 1em;
            border-top: 3px solid white;
            text-align: right;
            padding-top: 1.5em;
          }

          .total p {
            margin: 0;
          }
        `}</style>
      </div>
    )
  }
}

export default History

