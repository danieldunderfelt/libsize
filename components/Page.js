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
          <meta property="og:description" content="Easily get the size of libraries"/>
          <meta property="og:image" content="https://danieldunderfelt.com/static/images/me.jpg"/>
          <meta property="og:input" content="https://danieldunderfelt.com"/>
          <meta name="twitter:card" content="summary_large_image"/>

          <meta property="og:site_name" content="LibSize"/>
          <meta name="twitter:image:alt" content="LibSize"/>
        </Head>

        <Provider store={ state }>
          <div className="page-wrapper">
            { this.props.children }
          </div>
        </Provider>

        <script dangerouslySetInnerHTML={{ __html: ` (function(i,s,o,g,r,a,m)\{i['GoogleAnalyticsObject']=r;i[r]=i[r]||function()\{
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-99302912-1', 'auto');
  ga('send', 'pageview');` }}></script>

        <style jsx>{`
          .page-wrapper {
            padding: 1em;
          }

          @media (min-width: 875px) {
            .page-wrapper {
              padding: 2em;
            }
          }
        `}</style>

        <style jsx global>{`
          html {
            font-family: 'Work Sans', sans-serif;
            font-weight: 400;
            font-size: 20px;
            color: white;
          }
          body {
            margin: 0;
            background: #292939;
            min-height: 100%;
          }
          * {
            box-sizing: border-box;
          }
          h1 {
            font-size: 3em;
            line-height: 1;
          }
          p {
            line-height: 1.5;
          }
          strong {
            font-weight: 700;
          }
          .root-wrapper {
            height: 100%;
          }

          @media (min-width: 875px) {
            h1 {
              font-size: 5em;
              line-height: .7;
            }
          }
        `}</style>
      </div>
    )
  }
}

export default Page

