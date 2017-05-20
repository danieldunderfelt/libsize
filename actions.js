import { action } from 'mobx'
import fetch from 'unfetch'
import isUrl from './helpers/isUrl'
import normalizeUrl from 'normalize-url'

export default state => {

  const handleInput = action(input => {
    state.weighInput = input
  })

  const toggleLoading = action((setTo = !state.loading) => {
    state.loading = setTo
  })

  const addHistory = action(result => {
    if(state.results.findIndex(res => res.input === result.input) > -1) {
      return result
    }

    state.results.push(result)
    return result
  })

  const removeItem = action(inputOrObj => {
    const { input = inputOrObj } = inputOrObj
    const idx = state.results.findIndex(res => res.input === input)

    if(idx > -1) {
      state.results.splice(idx, 1)
    }
  })

  function weighInput(input) {
    toggleLoading(true)
    let inputStr = input

    if(isUrl(input)) {
      inputStr = normalizeUrl(input)
    }

    const existing = state.results.find(res => res.input === inputStr)
    if(existing) {
      toggleLoading(false)
      return Promise.resolve(existing)
    }

    return fetch('/json?input=' + encodeURIComponent(inputStr))
      .then(result => result.json())
      .then(result => addHistory(result))
      .then(() => toggleLoading(false))
  }

  return {
    handleInput,
    toggleLoading,
    addHistory,
    removeItem,
    weighInput
  }
}
