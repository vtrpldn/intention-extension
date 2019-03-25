export const storagePush = (stack, element, sendResponse, cb) => {
  return chrome.storage.sync.get({
    [stack]: []
  }, (items) => {
    chrome.storage.sync.set({
      [stack]: [
        element,
        ...items[stack]
      ]
    }, () => {
      sendResponse('WRITE_LOG-WRITTEN')
      cb()
    })
  })
}

export const storageClear = (stack, sendResponse, cb) => {
  return chrome.storage.sync.set({
    [stack]: []
  }, () => {
    sendResponse('CLEAR_LOG-CLEARED')
    cb()
  })
}
