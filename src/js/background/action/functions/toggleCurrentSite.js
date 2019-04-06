export const toggleCurrentSite = (request) => {
  /*
   * We need to get the siteList from storage frist
   */
  return chrome.storage.sync.get({
    siteList: []
  }, (items) => {
    /*
     * If the current URL is already listed...
     */
    if (request.isCurrentUrlListed) {
      /*
       * We remove the URL from siteList array
       * by setting it as a filtered version of itself
       */
      chrome.storage.sync.set({
        siteList: items.siteList.filter((val) => val !== request.currentActiveUrl)
      })
    } else {
      /*
       * Add the URL by pushing
       * it to the top of siteList array
       */
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
