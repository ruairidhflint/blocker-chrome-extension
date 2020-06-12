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

function renderURL(statusText) {
  currentURLInPopUp = statusText;
}

document.addEventListener('DOMContentLoaded', function () {
  getCurrentTabUrl(function (url) {
    renderURL(url);
  });
});
