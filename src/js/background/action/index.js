import { storagePush, storageClear } from 'utils/wrappers/storage'

import getPageStatus from 'background/action/functions/getPageStatus'
import setTimer from 'background/action/functions/setTimer'
import toggleCurrentSite from 'background/action/functions/toggleCurrentSite'

const action = {
  getPageStatus,
  setTimer,
  toggleCurrentSite,
  writeLog: (request) => storagePush('logs', request.data),
  clearLog: () => storageClear('logs')
}

export default action
