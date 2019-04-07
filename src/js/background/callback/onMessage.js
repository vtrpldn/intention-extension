import action from 'background/action/index'

export const onMessage = (request, sender, sendResponse) => {

  if (__DEV__) {
    console.log('DEBUG: MESSAGE RECEIVED', request.type)
  }

  switch (request.type) {
    case 'GET_PAGE_STATUS':
      action.getPageStatus(sendResponse)
      return true

    case 'SET_TIMER':
      action.setTimer(request)
      sendResponse()
      break

    case 'TOGGLE_CURRENT_SITE':
      action.toggleCurrentSite(request)
      sendResponse()
      break

    case 'WRITE_LOG':
      action.writeLog(request)
      sendResponse()
      return true

    case 'CLEAR_LOG':
      action.clearLog()
      sendResponse()
      break

    default:
      sendResponse(null)
      break
  }
}
