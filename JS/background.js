// On installation, set up storage within the User's Chrome browser to
// store the list of blocked websites
chrome.runtime.onInstalled.addListener(async () => {
  try {
    // Only initialize if storage doesn't already exist
    const existingData = await chrome.storage.local.get("shiaBlocked");
    if (!existingData.shiaBlocked) {
      await chrome.storage.local.set({ shiaBlocked: "[]" });
      console.log("LaBeouf Blocker initialized successfully");
    } else {
      console.log("LaBeouf Blocker storage already exists");
    }
  } catch (error) {
    console.error("Failed to initialize storage:", error);
  }
});

// Handle messages from content scripts and popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "reloadTab") {
    chrome.tabs.reload(sender.tab.id);
    sendResponse({ success: true });
  }
  return true; // Keep message channel open for async response
});
