import { getUrlListStatus, getUrlActiveStatus } from 'utils/siteCheck'
import { tabsCurrentUrl } from 'utils/wrappers/tabs'

export const getPageStatus = (sendResponse) => {
  return tabsCurrentUrl((currentUrl) => {
    chrome.storage.sync.get(['siteList'], ({ siteList }) => {
      // check if on list of sites
      let isCurrentUrlOnList = getUrlListStatus(siteList, currentUrl)

      // check if is already in ACTIVE_SITES_LIST
      chrome.storage.sync.get({
        activeSites: []
      }, function (items) {
        let isCurrentUrlActive = getUrlActiveStatus(items.activeSites, currentUrl)

        sendResponse({
          isCurrentUrlActive,
          isCurrentUrlOnList
        })
      })
    })
  })
}

export default getPageStatus
