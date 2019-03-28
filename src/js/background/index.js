import {
  getUrlListStatus,
  getUrlActiveStatus
} from '../utils/siteCheck'
import {
  storagePush,
  storageClear
} from '../utils/wrappers/storage'
import {
  tabsCurrentUrl
} from '../utils/wrappers/tabs';

let siteList = ''

// New page listener
chrome.tabs.onUpdated.addListener(function () {
  chrome.storage.sync.get({
    siteList: [],
    activeSites: []
  }, function (items) {
    console.log('activeSites:', items.activeSites)
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
            url: currentUrl,
            timer: request.timer / 1000,
            tick: 0
          }
        
          const intervalId = setInterval( () => {
            activeTabData.tick = activeTabData.tick + 1

            console.log(`${activeTabData.url} says TICK! ${activeTabData.tick}s have passed`);

            if (activeTabData.tick >= activeTabData.timer) {
              console.log(`${activeTabData.url} says GOODBYE!`);
              clearInterval(intervalId)
              removeSiteFromActiveListAndCloseAllMatchingTabs()
            }

          }, 1000)

          const removeSiteFromActiveListAndCloseAllMatchingTabs = () => {
            chrome.storage.sync.get({
              activeSites: []
            }, (items) => {
              chrome.storage.sync.set({
                activeSites: items.activeSites.filter((val) => val.url !== currentUrl)
              }, () => {
                chrome.tabs.query({
                  url: [
                    `*://${currentUrl}/*`,
                    `*://www.${currentUrl}/*`
                  ]
                }, (tabs) => {
                  tabs.forEach((tab) => {
                    chrome.tabs.remove(tab.id)
                  })
                })
              })
            })
          }

          storagePush('activeSites', {
            url: activeTabData.url,
            timer: activeTabData.timer,
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
            }, () => {
              sendResponse('TOGGLE_CURRENT_SITE-REMOVED')
            })
          } else {
            chrome.storage.sync.set({
              siteList: [
                request.currentActiveUrl,
                ...items.siteList
              ]
            }, () => {
              sendResponse('TOGGLE_CURRENT_SITE-ADDED')
            })
          }
        })

        return true

      default:
        sendResponse(null)
        break
    }
  }
)