// On installation, set up storage within the User's Chrome browser to
// store the list of blocked websites
chrome.runtime.onInstalled.addListener(async () => {
  try {
    await chrome.storage.sync.set({ shiaBlocked: "[]" });
    console.log("LaBeouf Blocker initialized successfully");
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
