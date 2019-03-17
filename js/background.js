let currentURL = ''
let siteList = ''
let pageStatus = null

chrome.tabs.onUpdated.addListener(function() {
    chrome.tabs.getSelected(null, function(tab) {
        currentURL = tab.url;
    });

    chrome.storage.sync.get({
        siteList: ''
    }, function (items) {
        siteList = items.siteList
    });
});

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        switch (request.type) {
            case 'GET_PAGE_STATUS':
                sendResponse(!!siteList.split('\n').filter((val) => currentURL.includes(val)).length)
                break;
            default:
                sendResponse(null)
                break;
        }
});