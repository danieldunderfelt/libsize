import React, { Component } from 'react'
import { observer, Provider } from 'mobx-react'
import Head from 'next/head'
import createState from '../state'

const state = createState()

@observer
class Page extends Component {

  render() {
    return (
      <div className="root-wrapper">
        <Head>
          <title>LibSize</title>
          <meta name="viewport" content="width=device-width, initial-scale=1"/>
          <link href="https://fonts.googleapis.com/css?family=Work+Sans:400,700" rel="stylesheet" />
          {/*<link rel='shortcut icon' type='image/x-icon' href='/static/favicon.png'/>*/}
          <meta property="og:title" content="LibSize"/>
          <meta property="og:description" content="Personal website for Daniel Dunderfelt"/>
          <meta property="og:image" content="https://mediamatch.live/static/images/me.jpg"/>
          <meta property="og:url" content="https://danieldunderfelt.com"/>
          <meta name="twitter:card" content="summary_large_image"/>

          <meta property="og:site_name" content="Daniel Dunderfelt"/>
          <meta name="twitter:image:alt" content="Daniel Dunderfelt"/>
        </Head>

        <Provider store={ state }>
          <div className="page-wrapper">
            { this.props.children }
          </div>
        </Provider>

        <style jsx>{`
          .page-wrapper {
            padding: 2em;
          }
        `}</style>

        <style jsx global>{`
          html {
            font-family: 'Work Sans', sans-serif;
            font-weight: 400;
          }
          body {
            margin: 0;
            background: #ddefff;
            min-height: 100%;
          }
          * {
            box-sizing: border-box;
          }
          h1 {
            font-family: 'Rubik Mono One', sans-serif;
          }
          p {
            line-height: 1.5;
            font-size: 1.125em;
          }
          strong {
            font-weight: 700;
          }
          .root-wrapper {
            height: 100%;
          }
        `}</style>
      </div>
    )
  }
}

export default Page

