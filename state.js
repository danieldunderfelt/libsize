import { observable } from 'mobx'

export default () => {

  const store = observable({
    weighUrl: '',
    loading: false,
    results: []
  })

  return store
}
