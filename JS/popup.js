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

// Parse URL to extract domain with better validation
function parseURL(url) {
  if (!url) {
    setErrorState("Not available here");
    return;
  }

  try {
    const urlObj = new URL(url);
    const domain = urlObj.hostname;

    // Check if we're on a blocked page (extension URL)
    if (
      url.startsWith("chrome-extension://") ||
      url.startsWith("moz-extension://")
    ) {
      setBlockedPageState();
      return;
    }

    // Validate domain format
    if (isValidDomain(domain)) {
      setSuccessState(domain);
    } else {
      setErrorState("Invalid domain");
    }
  } catch (error) {
    setErrorState("Not available here");
  }
}

// Validate domain format
function isValidDomain(domain) {
  // Check for valid domain format
  const domainRegex =
    /^([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/;
  return domainRegex.test(domain) && domain.length <= 253;
}

// Set success state for valid URL
function setSuccessState(domain) {
  currentURLInPopUp = domain;
  websiteDisplay.textContent = domain;
  faviconDisplay.src = `https://www.google.com/s2/favicons?domain=${domain}`;

  popupBlockButton.disabled = false;
  popupBlockButton.style.backgroundColor = "rgba(255, 69, 96, 0.8)";
  popupBlockButton.style.cursor = "pointer";
  popupBlockButton.textContent = "Block This Site";

  popupBlockButton.onclick = () => addToBlockList(domain);
}

// Set error state for invalid URL
function setErrorState(message) {
  websiteDisplay.textContent = message;
  faviconDisplay.src = "https://www.google.com/s2/favicons?domain=google.com";

  popupBlockButton.disabled = true;
  popupBlockButton.style.backgroundColor = "lightgrey";
  popupBlockButton.style.cursor = "not-allowed";
  popupBlockButton.textContent = "Block This Site";
  popupBlockButton.onclick = null;
}

// Set blocked page state
function setBlockedPageState() {
  websiteDisplay.textContent = "You're on a blocked page";
  faviconDisplay.src = "https://www.google.com/s2/favicons?domain=google.com";

  popupBlockButton.disabled = false;
  popupBlockButton.style.backgroundColor = "rgba(52, 152, 219, 0.8)";
  popupBlockButton.style.cursor = "pointer";
  popupBlockButton.textContent = "Manage Blocklist";
  popupBlockButton.onclick = () => chrome.runtime.openOptionsPage();
}

// Add URL to block list
async function addToBlockList(url) {
  try {
    const data = await chrome.storage.local.get("shiaBlocked");
    const oldBlockedList = JSON.parse(data.shiaBlocked || "[]");

    // Check if domain is already blocked
    if (oldBlockedList.includes(url)) {
      console.log("Domain already blocked:", url);
      return;
    }

    const newBlockedList = [...oldBlockedList, url];

    await chrome.storage.local.set({
      shiaBlocked: JSON.stringify(newBlockedList),
    });

    console.log("Successfully added to block list:", url);

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
