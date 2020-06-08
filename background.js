chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.sync.set({blocked: "['https://www.dailymail.co.uk', 'https://rory.codes' ]"}, function() {
    });
  });