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
  })
})

// Content messaging listener
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
          })
        })
        break

      case 'SET_TIMER':
        // Add site to ACTIVE_SITES_LIST
        chrome.storage.sync.set({
          activeSites: [
            {
              url: currentURL,
              timer: request.timer
            }
          ]
        })

        // Remove from ACTIVE_SITES_LIST and close tab
        chrome.tabs.getSelected(null, function (tab) {
          setTimeout(() => {
            chrome.storage.sync.set({
              activeSites: []
            }, function () {
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

const getUrlListStatus = (list, url) => {
  console.log('list:', list)
  console.log('url:', url)
  return !!list.trim().split('\n').filter((v) => url.includes(v)).length
}

const getUrlActiveStatus = (activeSites, url) => {
  console.log('activeSites:', activeSites)
  console.log('url:', url)
  return !!activeSites.map(v => v.url).filter((v) => v === url).length
}
