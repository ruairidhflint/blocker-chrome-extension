const currentURL = window.location.href;
const optionsUrl = chrome.extension.getURL('blocked.html');
const content = optionsUrl;

let blockedSites;

chrome.storage.sync.get('blocked', function (data) {
  blockedSites = JSON.parse(data.blocked);
  if (blockedSites.length) {
    for (let i = 0; i < blockedSites.length; i++) {
      if (currentURL.includes(blockedSites[i])) {
        window.location.assign(content);
      }
    }
  }
});
