import { observable } from 'mobx'

export default () => {

  const store = observable({
    weighInput: '',
    loading: false,
    results: []
  })

  return store
}
