export const navigationTarget = {
  NEW_WINDOW: 'new-window',
  NEW_TAB: 'new-tab',
  CURRENT_TAB: 'current-tab'
}

export const navigate = (url, target = navigationTarget.NEW_TAB) => {
  switch (target) {
    case navigationTarget.NEW_WINDOW:
      return chrome.windows.create({ url, focused: true, type: 'normal' })
    case navigationTarget.CURRENT_TAB:
      return chrome.tabs.update({ url, active: true })
    default:
      return chrome.tabs.create({ url, active: true })
  }
}
