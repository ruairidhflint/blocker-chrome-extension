// DOM elements
const toggleOption = document.getElementById("popup-settings-button");
const websiteDisplay = document.getElementById("popup-block-website");
const faviconDisplay = document.getElementById("popup-block-img");
const popupBlockButton = document.getElementById("popup-block-block-button");

let currentURLInPopUp;

// Event listener to open options page
toggleOption.addEventListener("click", (e) => {
  e.preventDefault();
  chrome.runtime.openOptionsPage();
});

// Get current tab URL using modern Chrome API
async function getCurrentTabUrl() {
  try {
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });
    return tab.url;
  } catch (error) {
    console.error("Error getting current tab URL:", error);
    return null;
  }
}

// Parse URL to extract domain
function parseURL(url) {
  if (!url) {
    setErrorState("Not available here");
    return;
  }

  const urlRegex = /^https?:\/\/([^\/:?#]+)(?:[\/:?#]|$)/i;
  const matches = url.match(urlRegex);
  const parsedDomain = matches && matches[1];

  if (parsedDomain) {
    setSuccessState(parsedDomain);
  } else {
    setErrorState("Not available here");
  }
}

// Set success state for valid URL
function setSuccessState(domain) {
  currentURLInPopUp = domain;
  websiteDisplay.textContent = domain;
  faviconDisplay.src = `https://www.google.com/s2/favicons?domain=${domain}`;

  popupBlockButton.disabled = false;
  popupBlockButton.style.backgroundColor = "rgba(255, 69, 96, 0.8)";
  popupBlockButton.style.cursor = "pointer";

  popupBlockButton.onclick = () => addToBlockList(domain);
}

// Set error state for invalid URL
function setErrorState(message) {
  websiteDisplay.textContent = message;
  faviconDisplay.src = "https://www.google.com/s2/favicons?domain=google.com";

  popupBlockButton.disabled = true;
  popupBlockButton.style.backgroundColor = "lightgrey";
  popupBlockButton.style.cursor = "not-allowed";
  popupBlockButton.onclick = null;
}

// Add URL to block list
async function addToBlockList(url) {
  try {
    const data = await chrome.storage.sync.get("shiaBlocked");
    const oldBlockedList = JSON.parse(data.shiaBlocked || "[]");
    const newBlockedList = [...oldBlockedList, url];

    await chrome.storage.sync.set({
      shiaBlocked: JSON.stringify(newBlockedList),
    });

    // Reload current tab to show blocked page
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });

    if (tab) {
      chrome.tabs.reload(tab.id);
    }
  } catch (error) {
    console.error("Error adding to block list:", error);
  }
}

// Initialize popup
async function initializePopup() {
  try {
    const url = await getCurrentTabUrl();
    parseURL(url);
  } catch (error) {
    console.error("Error initializing popup:", error);
    setErrorState("Error loading page");
  }
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", initializePopup);
