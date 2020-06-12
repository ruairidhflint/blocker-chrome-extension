let toggleOption = document.getElementById('popup-settings-button');
let websiteDisplay = document.getElementById('popup-block-website');
let faviconDisplay = document.getElementById('popup-block-img');
let currentURLInPopUp;

toggleOption.onclick = function (e) {
  e.preventDefault();
  chrome.runtime.openOptionsPage();
};

function getCurrentTabUrl(callback) {
  var queryInfo = {
    active: true,
    currentWindow: true,
  };

  chrome.tabs.query(queryInfo, function (tabs) {
    var tab = tabs[0];
    var url = tab.url;
    callback(url);
  });
}

function parseURL(statusText) {
  const urlRegex = /^https?\:\/\/([^\/:?#]+)(?:[\/:?#]|$)/i;
  let matches = statusText.match(urlRegex);
  let parsedDomain = matches && matches[1];

  if (parsedDomain) {
    currentURLInPopUp = parsedDomain;
    websiteDisplay.textContent = currentURLInPopUp;
    faviconDisplay.src = `https://www.google.com/s2/favicons?domain=${currentURLInPopUp}`;
  } else {
    websiteDisplay.textContent = 'Not available here';
    faviconDisplay.src = 'https://www.google.com/s2/favicons?domain=google.com';
  }
}

document.addEventListener('DOMContentLoaded', function () {
  getCurrentTabUrl(function (url) {
    parseURL(url);
  });
});
