let currentURL = ''
let siteList = ''
let pageStatus = null

chrome.tabs.onUpdated.addListener(function() {
    chrome.tabs.getSelected(null, function(tab) {
        currentURL = tab.url;
    });

    chrome.storage.sync.get(['siteList'], function (items) {
        siteList = items.siteList
    });
});

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        switch (request.type) {
            case 'GET_PAGE_STATUS':
                // REMEMBER TO TREAT EMPTY LIST SCENARIO
                console.log(siteList)
                console.log(siteList.split('\n').filter((val) => currentURL.includes(val)).length, currentURL)
                sendResponse(!!siteList.split('\n').filter((val) => currentURL.includes(val)).length)
                // sendResponse(false)
                break;
            case 'WRITE_LOG':
                // INCOMPLETE LOG WRITING LOGIC
                chrome.storage.sync.set({
                    logs: [
                        request.data
                    ]
                });
                break;
            case 'CLOSE_TAB':
                chrome.tabs.getSelected(null, function(tab) { 
                    chrome.tabs.remove(tab.id, function () {
                        console.log('callback aba removida')
                    })
                });
                break;
            default:
                sendResponse(null)
                break;
        }
});