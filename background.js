// chrome.runtime.onInstalled.addListener(function() {
//     chrome.storage.sync.set({blocked: '["https://rory.codes", "https://www.dailymail.co.uk"]'}, function() {
//     });
//   });

  chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.sync.set({blocked: '[]'}, function() {
    });
  });