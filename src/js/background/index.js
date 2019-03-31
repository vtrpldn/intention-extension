import {
  getUrlListStatus,
  getUrlActiveStatus
} from '../utils/siteCheck'

import {
  storagePush,
  storageClear,
  storageFilter
} from '../utils/wrappers/storage'

import {
  tabsCurrentUrl,
  tabsCloseMatch
} from '../utils/wrappers/tabs'

let siteList = ''

// New page listener
chrome.tabs.onUpdated.addListener(function () {
  chrome.storage.sync.get({
    siteList: [],
    activeSites: []
  }, function (items) {
    console.log('siteList:', items.siteList)
    siteList = items.siteList
  })
})

// Content Message Listener
chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    switch (request.type) {
      case 'GET_PAGE_STATUS':
        tabsCurrentUrl((currentUrl) => {
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
        return true

      case 'WRITE_LOG':
        storagePush('logs', request.data)
        return true

      case 'CLEAR_LOG':
        storageClear('logs')
        return true

      case 'SET_TIMER':
        tabsCurrentUrl((currentUrl) => {
          let activeTabData = {
            timestamp: request.data.timestamp,
            timer: request.data.timer / 1000,
            url: currentUrl,
            tick: 0
          }
 
          const intervalId = setInterval(() => {
            activeTabData.tick = activeTabData.tick + 1

            console.log(`${activeTabData.url} says TICK! ${activeTabData.tick}s have passed`)

            if (activeTabData.tick >= activeTabData.timer) {
              console.log(`${activeTabData.url} says GOODBYE!`)

              clearInterval(intervalId)

              // Remove activeTabData.url from activeSites list and close tabs after it is done
              storageFilter('activeSites', (v) => v.url !== activeTabData.url, tabsCloseMatch(activeTabData.url))
            }
          }, 1000)

          storagePush('activeSites', {
            url: activeTabData.url,
            timer: activeTabData.timer,
            timestamp: activeTabData.timestamp,
            intervalId
          })
        })

        break

      case 'TOGGLE_CURRENT_SITE':
        chrome.storage.sync.get({
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
        sendResponse(null)
        break

      default:
        sendResponse(null)
        break
    }
  }
)
