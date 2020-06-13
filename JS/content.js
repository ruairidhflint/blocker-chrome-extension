const currentURL = window.location.href;
const blockedURL = chrome.extension.getURL('/HTML/blocked.html');
const content = blockedURL;

let blockedSites;

// Parse data from the user's chrome storage and add to blockedSites var
chrome.storage.sync.get('shiaBlocked', function (data) {
  blockedSites = JSON.parse(data.shiaBlocked);
  // Assuming there is content, loop through checking if the current URL matches any of the list items
  if (blockedSites.length) {
    for (let i = 0; i < blockedSites.length; i++) {
      if (currentURL.includes(blockedSites[i])) {
        // If so, redirect to blocked page
        window.location.assign(content);
      }
    }
  }
});
