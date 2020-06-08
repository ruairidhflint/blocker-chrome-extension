chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.sync.set({blocked: '["https://rory.codes"]'}, function() {
    });
  });