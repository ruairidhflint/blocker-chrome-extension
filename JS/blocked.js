const optionsURL = chrome.extension.getURL('/HTML/options.html');
const optionsLinkDOM = document.getElementById('options-link');

document.addEventListener('DOMContentLoaded', () => {
  optionsLinkDOM.href = optionsURL;
  optionsLinkDOM.textContent = 'LeBeouf Blocker.';
}); 
