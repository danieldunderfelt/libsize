import { action } from 'mobx'
import fetch from 'unfetch'
import normalizeUrl from 'normalize-url'

export default state => {

  const handleInput = action(input => {
    state.weighUrl = input
  })

  const toggleLoading = action((setTo = !state.loading) => {
    state.loading = setTo
  })

  const addHistory = action(result => {
    if(state.results.findIndex(res => res.url === result.url) > -1) {
      return result
    }

    state.results.push(result)
    return result
  })

  function weighUrl(url) {
    const normalizedUrl = normalizeUrl(url)
    const existing = state.results.find(res => res.url === normalizedUrl)
    if(existing) return Promise.resolve(existing)

    return fetch('/json?url=' + encodeURIComponent(normalizedUrl))
      .then(result => result.json())
      .then(result => addHistory(result))
  }

  return {
    handleInput,
    toggleLoading,
    weighUrl
  }
}
