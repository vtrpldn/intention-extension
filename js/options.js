const btnSave = document.querySelector('.js-options-save')
const txtSitelist = document.querySelector('.js-options-sitelist')

const defaultState = {
    siteList: ''
}

const restoreOptions = () => {
    chrome.storage.sync.get(defaultState, function (items) {
        txtSitelist.value = items.siteList;
    });
}

document.addEventListener('DOMContentLoaded', restoreOptions);

btnSave.addEventListener('click', (e) => {

    chrome.storage.sync.set({
        siteList: txtSitelist.value
    }, function () {
        alert('Sites saved')
    });
    
})