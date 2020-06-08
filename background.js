const currentURL = window.location.href;

const blockedSites = [
  'https://www.dailymail.co.uk',
  'https://www.reddit.com',
];

for (let i = 0; i < blockedSites.length; i++) {
  if (currentURL.includes(blockedSites[i])) {
    window.location.href = 'https://rory.codes';
  } else {
    console.log('This is fine!');
  }
}
