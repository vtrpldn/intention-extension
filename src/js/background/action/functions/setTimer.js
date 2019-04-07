import { tabsCurrentUrl, tabsCloseMatch } from 'utils/wrappers/tabs'
import { storagePush, storageFilter } from 'utils/wrappers/storage'

/*
 * This function starts a new timer for
 * the current url with the apropriate time 
 */
export const setTimer = (request) => {

  /*
   * First we need to ask chrome for the current URL
   */
  return tabsCurrentUrl((currentUrl) => {

    /* 
     * Then we create an activeSite object to
     * keep our data organized
     */
    let activeSite = {
      timestamp: request.data.timestamp,
      timer: request.data.timer * 60,
      url: currentUrl,
      tick: 0
    }

    /* 
     * This is the interval function and it runs every second.
     * When it reaches the specified amount of time, it removes
     * the site com activeSites and closes all matching tabs
     */
    const intervalId = setInterval(() => {
      activeSite.tick = activeSite.tick + 1

      if (__DEV__) {
        console.log(`${activeSite.url} says TICK! ${activeSite.timer - activeSite.tick}s left... | ${intervalId}`) 
      }

      if (activeSite.tick >= activeSite.timer) {

        if (__DEV__) {
          console.log(`${activeSite.url} says GOODBYE!`)
        }

        clearInterval(intervalId)
        storageFilter('activeSites', (v) => v.url !== activeSite.url, tabsCloseMatch(activeSite.url))
      }
    }, 1000)

    /*
     * Here we simply push a new activeSite object to
     * the storage array
     */
    storagePush('activeSites', {
      url: activeSite.url,
      timer: activeSite.timer,
      timestamp: activeSite.timestamp,
      intervalId
    })
  })
}

export default setTimer
