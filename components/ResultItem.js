import React, { Component } from 'react'
import { observer } from 'mobx-react'
import prettyBytes from '../helpers/prettyBytes'

@observer
class ResultItem extends Component {

  render() {
    const { result: {type, input, size, gzipSize, _error, _loading }, onRemove } = this.props

    return (
      <div className={`result-item ${ _error ? 'error' : '' }`}>
        <div className="meta">
          <div className="type-badge">
            { type }
          </div>
          <button
            className="remove-btn"
            onClick={ e => onRemove(input) }>
            ✕
          </button>
        </div>
        <h4>
          { input }
        </h4>
        { _loading ? (
          <div className="content">
            <h3>Weighing in progress...</h3>
          </div>
        ) : _error ? (
          <div className="content">
            <p>
              { _error }
            </p>
          </div>
        ) : (
          <div className="content">
            <p className="size-display size">
              <span>
                Size
              </span>
              <strong>{ prettyBytes(size) }</strong>
            </p>
            <p className="size-display gzip-size">
              <span>
                Gzipped
              </span>
              <strong>{ prettyBytes(gzipSize) }</strong>
            </p>
          </div>
        )}
        <style jsx>{`
          .result-item {
            border-radius: 5px;
            border: 1px solid #555;
            background: rgba(255,255,255, .075);
            position: relative;
          }

          .result-item.error {
            background: #aa6666;
          }

          .meta {
            position: absolute;
            top: -1px;
            right: -1px;
          }

          .type-badge {
            padding: .25em .75em;
            font-size: .75em;
            text-transform: uppercase;
            color: #ccc;
            display: inline-block;
            background-color: #444466;
            user-select: none;
          }

          .remove-btn {
            background: #aa6666;
            color: white;
            border: 0;
            appearance: none;
            padding: .25em .5em;
            font-size: .75em;
            cursor: pointer;
            border-top-right-radius: 5px;
            transition: background .1s ease-in;
          }

          .remove-btn:hover {
            background: #ef362e;
          }

          .result-item h4 {
            margin: 0;
            padding: 1.5em 1em 1em .6em;
            font-weight: 400;
          }

          .content {
            border-top: 1px solid #555;
          }

          .result-item p {
            margin: 0;
          }

          .size-display {
            display: inline-block;
            padding: .5em .75em;
            text-align: center;
          }

          .size-display.size {
            border-right: 1px solid #555;
          }

          .size-display span {
            display: block;
            font-size: .5em;
            text-transform: uppercase;
          }
        `}</style>
      </div>
    )
  }
}

export default ResultItem

