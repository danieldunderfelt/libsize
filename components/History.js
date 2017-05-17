import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import _ from 'lodash'
import prettyBytes from 'pretty-bytes'

@inject('store')
@observer
class History extends Component {

  render() {
    const { results } = this.props.store

    return (
      <div>
        <ul className="results">
          { _.reverse(results.slice()).map(result => (
            <li className="size-result" key={ result.url }>
              <h4>
                { result.url }
              </h4>
              <dl>
                <dt>Size</dt>
                <dd>
                  <strong>{ prettyBytes(result.size) }</strong>
                </dd>
                <dt>Gzipped</dt>
                <dd>
                  <strong>{ prettyBytes(result.gzipSize) }</strong>
                </dd>
              </dl>
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
            background: rgba(255,255,255,.5);
          }

          .size-result h4 {
            margin-top: 0;
          }

          .total {
            margin-top: 1em;
            border-top: 3px solid black;
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

