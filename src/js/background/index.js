import { getUrlListStatus, getUrlActiveStatus } from '../utils/siteCheck'

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

        return true // must return true for async messaging

      case 'WRITE_LOG':
        // Push new log to usage list
        chrome.storage.sync.get({
          logs: []
        }, (items) => {
          chrome.storage.sync.set({
            logs: [
              request.data,
              ...items.logs
            ]
          }, () => {
            sendResponse('WRITE_LOG-WRITTEN')
          })
        })
        break

      case 'CLEAR_LOG':
        // Push new log to usage list
        chrome.storage.sync.set({
          logs: []
        }, () => {
          sendResponse('CLEAR_LOG-CLEARED')
        })
        return true

      case 'SET_TIMER':
        // Add site to ACTIVE_SITES_LIST
        chrome.storage.sync.get({
          activeSites: []
        }, (items) => {
          chrome.storage.sync.set({
            activeSites: [
              {
                url: currentURL,
                timer: request.timer
              },
              ...items.activeSites
            ]
          })
        })

        // Remove from ACTIVE_SITES_LIST and close tab
        chrome.tabs.getSelected(null, function (tab) {
          setTimeout(() => {
            chrome.storage.sync.get({
              activeSites: []
            }, (items) => {
              chrome.storage.sync.set({
                activeSites: []
              }, () => {
                chrome.tabs.query({
                  url: [
                    `*://${currentURL}/*`,
                    `*://www.${currentURL}/*`,
                  ]
                }, (tabs) => {
                  tabs.forEach((tab) => {
                    chrome.tabs.remove(tab.id)
                  })
                })
              })
            })
          }, request.timer)
        })
        break

      case 'TOGGLE_CURRENT_SITE':
        chrome.storage.sync.get({
          siteList: ''
        }, (items) => {
          if (request.isCurrentUrlListed) {
            chrome.storage.sync.set({
              siteList: items.siteList.replace(request.currentActiveUrl, '').trim()
            }, () => {
              sendResponse('TOGGLE_CURRENT_SITE-REMOVED')
            })
          } else {
            chrome.storage.sync.set({
              siteList: items.siteList.trim() + '\n' + request.currentActiveUrl
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
