import React from 'react'
import { observer } from 'mobx-react'
import Page from '../components/Page'
import WeighUrl from '../components/WeighUrl'

export default observer(props => (
  <Page>
    <h1>
      LIBSIZE
    </h1>
    <WeighUrl />
  </Page>
))

