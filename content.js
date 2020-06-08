const currentURL = window.location.href;
const optionsUrl = chrome.extension.getURL('blocked.html');
const content = optionsUrl;

let blockedSites;

chrome.storage.sync.get('blocked', function (data) {
  blockedSites = data.blocked;
  for (let i = 0; i < blockedSites.length; i++) {
    if (currentURL.includes(blockedSites[i])) {
      window.location.href = content;
    }
  }
});
