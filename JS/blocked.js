// Array of motivational quotes
const motivationalQuotes = [
  "JUST DO IT.",
  "DON'T LET YOUR DREAMS BE DREAMS.",
  "YESTERDAY YOU SAID TOMORROW.",
  "MAKE YOUR DREAMS COME TRUE.",
  "STOP GIVING UP.",
  "SOME PEOPLE DREAM OF SUCCESS, WHILE YOU'RE GONNA WAKE UP AND WORK HARD AT IT.",
];

// Set up options link and random quote on blocked page
async function setupBlockedPage() {
  try {
    // Set up options link
    const optionsURL = chrome.runtime.getURL("HTML/options.html");
    const optionsLinkDOM = document.getElementById("options-link");

    if (optionsLinkDOM) {
      optionsLinkDOM.href = optionsURL;
      optionsLinkDOM.textContent = "LaBeouf Blocker.";
    }

    // Set random quote
    const quoteElement = document.querySelector(".blocked-container h1");
    if (quoteElement) {
      const randomQuote =
        motivationalQuotes[
          Math.floor(Math.random() * motivationalQuotes.length)
        ];
      quoteElement.textContent = randomQuote;
    }
  } catch (error) {
    console.error("Error setting up blocked page:", error);
  }
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", setupBlockedPage);
