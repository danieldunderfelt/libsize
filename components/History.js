import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import _ from 'lodash'

@inject('store')
@observer
class History extends Component {

  render() {
    const { results } = this.props.store

    return (
      <div>
        <ul>
          { _.reverse(results.slice()).map(result => (
            <li key={ result.url }>
              <h4>
                { result.url }
              </h4>
              <dl>
                <dt>Size</dt>
                <dd>
                  <strong>{ result.size }</strong>
                </dd>
                <dt>Gzipped</dt>
                <dd>
                  <strong>{ result.gzipSize }</strong>
                </dd>
              </dl>
            </li>
          )) }
        </ul>
      </div>
    )
  }
}

export default History

