// Check if current URL should be blocked
async function checkAndBlockURL() {
  try {
    const currentURL = window.location.href;
    const blockedURL = chrome.runtime.getURL("HTML/blocked.html");

    // Get blocked sites from storage
    const data = await chrome.storage.local.get("shiaBlocked");
    const blockedSites = JSON.parse(data.shiaBlocked || "[]");

    // Extract domain from current URL using URL constructor for better parsing
    let currentDomain;
    try {
      const urlObj = new URL(currentURL);
      currentDomain = urlObj.hostname;
    } catch (error) {
      console.error("Error parsing current URL:", error);
      return;
    }

    // Check if current domain matches any blocked sites
    if (blockedSites.length > 0 && currentDomain) {
      for (const blockedSite of blockedSites) {
        // Do exact domain matching with normalization
        if (normalizeDomain(currentDomain) === normalizeDomain(blockedSite)) {
          console.log(
            "Blocking site:",
            currentDomain,
            "matches blocked site:",
            blockedSite
          );
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

// Normalize domain for consistent comparison
function normalizeDomain(domain) {
  if (!domain) return "";

  // Convert to lowercase and remove www. prefix for comparison
  let normalized = domain.toLowerCase().trim();

  // Remove www. prefix if present
  if (normalized.startsWith("www.")) {
    normalized = normalized.substring(4);
  }

  return normalized;
}

// Run the check when the script loads
checkAndBlockURL();
