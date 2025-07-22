// Check if current URL should be blocked
async function checkAndBlockURL() {
  try {
    const currentURL = window.location.href;
    const blockedURL = chrome.runtime.getURL("HTML/blocked.html");

    // Get blocked sites from storage
    const data = await chrome.storage.sync.get("shiaBlocked");
    const blockedSites = JSON.parse(data.shiaBlocked || "[]");

    // Check if current URL matches any blocked sites
    if (blockedSites.length > 0) {
      for (const blockedSite of blockedSites) {
        if (currentURL.includes(blockedSite)) {
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
