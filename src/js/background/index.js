import { onMessage } from 'background/callback/onMessage'
import { onInstalled } from 'background/callback/onInstalled'

chrome.runtime.onInstalled.addListener(onInstalled)
chrome.runtime.onMessage.addListener(onMessage)

// chrome.tabs.onCreated.addListener((a) => {
//   console.log('DEBUG: CREATED! ', a)
// })

// chrome.tabs.onUpdated.addListener((a,b,c) => {
//   console.log('DEBUG: UPDATED! ', a,b,c)
// })

// chrome.tabs.onActivated.addListener((a) => {
//   console.log('DEBUG: ACTIVATED! ', a)
// })

// chrome.tabs.onHighlighted.addListener((a) => {
//   console.log('DEBUG: HIGHLIGHTED! ', a)
// })
