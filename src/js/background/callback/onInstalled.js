const INITIAL_STATE = {
  siteList: [],
  activeSites: [],
  logs: []
}

export const onInstalled = () => {
  chrome.storage.sync.set(INITIAL_STATE, () => {
    if (__DEV__) {
      console.log('DEBUG: STORAGE INITIALIZED')
    }
  })
}
