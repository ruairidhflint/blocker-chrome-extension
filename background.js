const testHref = window.location.href;

if (testHref.includes('https://www.google.com/')) {
  window.location.href = 'https://rory.codes';
} else {
  console.log('This is fine!');
}

console.log(testHref);
