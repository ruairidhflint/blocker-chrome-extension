let changeColor = document.getElementById('changeColor');
let testDisplay = document.getElementById('test-display');

let currentURLInPopUp;
changeColor.onclick = function () {
  // chrome.runtime.openOptionsPage();
  testDisplay.textContent = currentURLInPopUp;
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
  currentURLInPopUp = parsedDomain;
}

document.addEventListener('DOMContentLoaded', function () {
  getCurrentTabUrl(function (url) {
    parseURL(url);
  });
});
