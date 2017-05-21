import { observable } from 'mobx'

export default () => {

  const store = observable({
    weighInput: '',
    results: []
  })

  return store
}
