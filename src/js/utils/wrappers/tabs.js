export const tabsCurrentUrl = (cb) => {
    return chrome.tabs.query({
        active: true,
        currentWindow: true
    }, (tabs) => {
        let currentActiveUrl = new URL(tabs[0].url).hostname
        cb(currentActiveUrl)
    })
}

export const tabsCloseMatch = (url) => {
  return chrome.tabs.query({
    url: [
      `*://${url}/*`,
      `*://www.${url}/*`
    ]
  }, (tabs) => {
    tabs.forEach((tab) => {
      chrome.tabs.remove(tab.id)
    })
  })
}