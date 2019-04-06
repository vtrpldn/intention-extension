/* 
 * This function handles the logic behind
 * that button on Popup.js that adds or removes
 * sites to the restricted list
 */

export const toggleCurrentSite = (request) => {

  /*
   * First we need to get the siteList from storage
   */

  return chrome.storage.sync.get({
    siteList: [],
    activeSites: []
  }, (items) => {

    /*
     * If the current URL is already listed...
     */

    if (request.isCurrentUrlListed) {

      /* We need to get the activeSiteObject */
      const [activeSiteObject] = items.activeSites.filter((val) => val.url === request.currentActiveUrl)

      console.log('DEBUG: ACTIVESITEOBJECT: ', activeSiteObject)

      /*
       * Then we remove the URL from siteList array AND 
       * from activeSites by setting it as a filtered 
       * version of themselves
       */

      chrome.storage.sync.set({
        siteList: items.siteList.filter((val) => val !== request.currentActiveUrl),
        activeSites: items.activeSites.filter((val) => val.url !== request.currentActiveUrl) // I also have to kill the interval here somehow...
      }, () => {

        /*
         * When the storage is updated, clear the interval 
         * so the tabs don't close when it expires
         */
        
        clearInterval(activeSiteObject.intervalId)
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
