let changeColor = document.getElementById('changeColor');

changeColor.onclick = function () {
  chrome.runtime.openOptionsPage();
};
