// Check if current URL should be blocked
async function checkAndBlockURL() {
  try {
    const currentURL = window.location.href;
    const blockedURL = chrome.runtime.getURL("HTML/blocked.html");

    // Get blocked sites from storage
    const data = await chrome.storage.sync.get("shiaBlocked");
    const blockedSites = JSON.parse(data.shiaBlocked || "[]");

    // Extract domain from current URL
    const urlRegex = /^https?:\/\/([^\/:?#]+)(?:[\/:?#]|$)/i;
    const matches = currentURL.match(urlRegex);
    const currentDomain = matches && matches[1];

    // Check if current domain matches any blocked sites
    if (blockedSites.length > 0 && currentDomain) {
      for (const blockedSite of blockedSites) {
        // Do exact domain matching instead of substring matching
        if (currentDomain === blockedSite) {
          // Redirect to blocked page
          window.location.assign(blockedURL);
          return;
        }
      }
    }
  } catch (error) {
    console.error("Error checking blocked sites:", error);
  }
}

// Run the check when the script loads
checkAndBlockURL();
