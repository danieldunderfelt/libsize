import { action, observable, extendObservable } from 'mobx'
import fetch from 'unfetch'
import isUrl from './helpers/isUrl'
import normalizeUrl from 'normalize-url'

export default state => {

  const handleInput = action(input => {
    state.weighInput = input
  })

  const toggleLoading = action((result, setTo = !result.loading) => {
    result._loading = setTo
  })

  const addResult = action(result => {
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

  function createResult(input, type) {
    const result = observable({
      input,
      type,
      size: 0,
      gzipSize: 0,
      _loading: false,
      _error: false
    })

    return result
  }

  function handleError(res) {
    if(!res.ok) {
      throw Error(res.statusText)
    }

    return res
  }

  const showError = action((result, message) => {
    result._error = message
    toggleLoading(result, false)
  })

  function weighInput(input) {
    let inputStr = input
    let type = 'npm'

    if(isUrl(input)) {
      inputStr = normalizeUrl(input)
      type = 'url'
    }

    const existing = state.results.find(res => res.input === inputStr)
    if(existing) {
      toggleLoading(existing, false)
      return Promise.resolve(existing)
    }

    const result = createResult(inputStr, type)

    toggleLoading(result, true)
    addResult(result)

    return fetch('/json?input=' + encodeURIComponent(inputStr))
      .then(handleError)
      .then(response => response.json())
      .then(response => extendObservable(result, response))
      .then(res => toggleLoading(res, false))
      .catch(err => showError(result, err.message))
  }

  return {
    handleInput,
    toggleLoading,
    addResult,
    removeItem,
    weighInput
  }
}
