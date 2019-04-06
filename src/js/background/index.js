import { onMessage } from 'background/events/onMessage'
import { onInstalled } from 'background/events/onInstalled'

chrome.runtime.onInstalled.addListener(onInstalled)
chrome.runtime.onMessage.addListener(onMessage)
