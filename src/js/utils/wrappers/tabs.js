export const tabsCurrentUrl = (cb) => {
    return chrome.tabs.query({
        active: true,
        currentWindow: true
    }, (tabs) => {
        let currentActiveUrl = new URL(tabs[0].url).hostname
        cb(currentActiveUrl)
    })
}