// const currentURL = window.location.href;

const blockedSites = [
  'https://www.dailymail.co.uk',
  //   'https://www.reddit.com',
];

// for (let i = 0; i < blockedSites.length; i++) {
//   if (currentURL.includes(blockedSites[i])) {
//     window.location.href = 'https://rory.codes';
//   } else {
//     console.log('This is fine!');
//   }
// }

// chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
//   chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
//     let url = tabs[0].url;
//     // use `url` here inside the callback because it's asynchronous!
//     for (let i = 0; i < blockedSites.length; i++) {
//       if (url && url.includes(blockedSites[i])) {
//         chrome.tabs.update(null, 'https://rory.codes', null);
//       }
//     }
//   });
// });
