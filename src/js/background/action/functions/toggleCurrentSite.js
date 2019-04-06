export const toggleCurrentSite = (request) => {
  return chrome.storage.sync.get({
    siteList: []
  }, (items) => {
    if (request.isCurrentUrlListed) {
      chrome.storage.sync.set({
        siteList: items.siteList.filter((val) => val !== request.currentActiveUrl)
      })
    } else {
      chrome.storage.sync.set({
        siteList: [
          request.currentActiveUrl,
          ...items.siteList
        ]
      })
    }
  })
}

export default toggleCurrentSite
