import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import _ from 'lodash'
import actions from '../actions'
import ResultItem from './ResultItem'
import prettyBytes from '../helpers/prettyBytes'

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
              <ResultItem
                onRemove={ this.actions.removeItem }
                result={ result } />
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
            display: flex;
            flex-wrap: wrap;
          }

          .size-result {
            margin-bottom: 1em;
            margin-right: 1em;
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

