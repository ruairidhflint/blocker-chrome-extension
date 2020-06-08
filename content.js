const currentURL = window.location.href;

const blockedSites = ['https://www.dailymail.co.uk'];

var optionsUrl = chrome.extension.getURL("blocked.html"); 
var content = optionsUrl;

for (let i = 0; i < blockedSites.length; i++) {
  if (currentURL.includes(blockedSites[i])) {
    window.location.href = content;
  }
}

