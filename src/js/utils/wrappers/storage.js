export const storagePush = (stack, element, cb) => {
  return chrome.storage.sync.get({
    [stack]: []
  }, (items) => {
    chrome.storage.sync.set({
      [stack]: [
        element,
        ...items[stack]
      ]
    }, cb)
  })
}

export const storageClear = (stack, cb) => {
  return chrome.storage.sync.set({
    [stack]: []
  }, cb)
}
