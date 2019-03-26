import {
  getUrlListStatus,
  getUrlActiveStatus
} from '../utils/siteCheck'

import {
  storagePush,
  storageClear
} from '../utils/wrappers/storage'

let currentURL = ''
let siteList = ''

// New page listener
chrome.tabs.onUpdated.addListener(function () {
  chrome.tabs.getSelected(null, function (tab) {
    currentURL = new URL(tab.url).hostname
  })

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
        // check if on list of sites
        let isCurrentUrlOnList = getUrlListStatus(siteList, currentURL)

        // check if is already in ACTIVE_SITES_LIST
        chrome.storage.sync.get({
          activeSites: []
        }, function (items) {
          let isCurrentUrlActive = getUrlActiveStatus(items.activeSites, currentURL)

          sendResponse({
            isCurrentUrlActive,
            isCurrentUrlOnList
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
        chrome.tabs.query({
          active: true,
          currentWindow: true
        }, (tabs) => {
          let currentActiveUrl = new URL(tabs[0].url).hostname

          const timeOutFunc = () => {
            chrome.storage.sync.get({
              activeSites: []
            }, (items) => {
              chrome.storage.sync.set({
                activeSites: items.activeSites.filter((val) => val.url !== currentActiveUrl)
              }, () => {
                chrome.tabs.query({
                  url: [
                    `*://${currentActiveUrl}/*`,
                    `*://www.${currentActiveUrl}/*`
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
            url: currentActiveUrl,
            timer: request.timer,
            timeoutId: setTimeout(timeOutFunc, request.timer)
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