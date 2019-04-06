import { onMessage } from './events/onMessage'
import { onInstalled } from './events/onInstalled'

chrome.runtime.onInstalled.addListener(onInstalled)
chrome.runtime.onMessage.addListener(onMessage)
