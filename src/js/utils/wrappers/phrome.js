export const phrome = {
  tabs: {
    getCurrentUrl: () => {
      return new Promise((res) => {
        chrome.tabs.query({
          active: true,
          currentWindow: true
        }, (tabs) => {
          res(new URL(tabs[0].url).hostname)
        })
      })
    }
  },
  storage: {
    get: (obj) => {
      return new Promise((res) => {
        chrome.storage.sync.get(obj, (items) => res(items))
      })
    }
  }
}
