let currentURL = ''
let siteList = ''
let pageStatus = null

// New page listener
chrome.tabs.onUpdated.addListener(function () {

  chrome.tabs.getSelected(null, function (tab) {
    currentURL = tab.url
  })

  chrome.storage.sync.get({
    siteList: [],
    activeSites: []
  }, function (items) {
    siteList = items.siteList

    console.log(items.activeSites)
  })
})

// Content messaging listener
chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    switch (request.type) {

      case 'GET_PAGE_STATUS':
        // check if on list of sites
        let isCurrentUrlOnList = !!siteList.split('\n').filter((val) => currentURL.includes(val)).length
        // check if is already in ACTIVE_SITES_LIST
        chrome.storage.sync.get({
          activeSites: []
        }, function(items) {
          console.log(`===== CURRENT URL`)
          console.log(`===== ${currentURL} `)
          console.log(`===== ACTIVE SITES`)
          console.log(items)

          let isCurrentUrlActive = !!items.activeSites.map(val => val.url).filter((val) => val === currentURL).length

          console.log(`===== CURRENT URL ACTIVE`)
          console.log(`===== ${isCurrentUrlActive} `)

          sendResponse(true)
        })
        break

      case 'WRITE_LOG':
        chrome.storage.sync.get({
          logs: []
        }, (items) => {
          chrome.storage.sync.set({
            logs: [
              request.data,
              ...items.logs
            ]
          })
        })
        break

      case 'SET_TIMER':
        // add site to ACTIVE_SITES_LIST
        chrome.storage.sync.set({
          activeSites: [
            {
              url: currentURL,
              timer: request.timer
            }
          ]
        })

        chrome.tabs.getSelected(null, function (tab) {
          setTimeout(() => {
            // remove from ACTIVE_SITES_LIST and close tab
            chrome.storage.sync.set({
              activeSites: []
            }, function() {
              chrome.tabs.remove(tab.id)
            })
          }, request.timer)
        })

        break

      default:
        sendResponse(null)
        break
    }
  }
)