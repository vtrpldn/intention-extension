import {
  storagePush,
  storageClear
} from '../../utils/wrappers/storage'

import getPageStatus from './functions/getPageStatus'
import setTimer from './functions/setTimer'
import toggleCurrentSite from './functions/toggleCurrentSite'

const action = {
  getPageStatus,
  setTimer,
  toggleCurrentSite,
  writeLog: (request) => storagePush('logs', request.data),
  clearLog: () => storageClear('logs')
}

export default action
