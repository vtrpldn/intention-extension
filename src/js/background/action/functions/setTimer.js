import { tabsCurrentUrl, tabsCloseMatch } from 'utils/wrappers/tabs'
import { storagePush, storageFilter } from 'utils/wrappers/storage'

export const setTimer = (request) => {
  return tabsCurrentUrl((currentUrl) => {
    console.log('SET_TIMER currentUrl', currentUrl)

    let activeTabData = {
      timestamp: request.data.timestamp,
      timer: request.data.timer,
      url: currentUrl,
      tick: 0
    }

    const intervalId = setInterval(() => {
      activeTabData.tick = activeTabData.tick + 1

      console.log(`${activeTabData.url} says TICK! ${activeTabData.timer - activeTabData.tick}s left... | ${intervalId}`)

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
}

export default setTimer
