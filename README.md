# LaBeouf Blocker

### Version 3.0.0

A Chrome extension to boost your productivity and focus by channeling your inner Shia. Block distracting or harmful websites with a click and replace them with an inspirational message.

## Features

- **Easy Blocking**: Block any website with a single click from the popup
- **Smart Detection**: Automatically detects and displays the current website
- **Manage Blocklist**: Add and remove blocked sites through the options page
- **Inspirational Messages**: Blocked sites show motivational Shia LaBeouf content
- **Modern Design**: Clean, accessible interface with responsive design
- **Cross-device Sync**: Blocked sites sync across your Chrome devices

## Installation

### From Chrome Web Store

[LaBeouf Blocker on Chrome Web Store](https://chrome.google.com/webstore/detail/labeouf-blocker/jjmhcnkpkpmfifppnggagimcmcolkcee)

### Manual Installation

1. Download or clone this repository
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode" in the top right
4. Click "Load unpacked" and select the extension folder
5. The extension is now installed and ready to use

## Usage

### Blocking a Website

1. Navigate to the website you want to block
2. Click the LaBeouf Blocker extension icon in your toolbar
3. Click the "Block" button
4. The site will be blocked immediately

### Managing Blocked Sites

1. Click the settings gear (⚙) in the popup, or
2. Right-click the extension icon and select "Options"
3. Add new sites by typing the domain (e.g., "instagram.com")
4. Remove sites by clicking the "×" button next to them

## Technical Details

- **Manifest Version**: 3 (latest Chrome extension standard)
- **Permissions**:
  - `activeTab`: To access current tab information
  - `storage`: To save blocked sites list
  - `tabs`: To reload tabs after blocking
- **Host Permissions**: Access to all websites for blocking functionality

## Development

This extension has been modernized with:

- Manifest V3 compliance
- Modern JavaScript (async/await, ES6+)
- Improved error handling
- Better accessibility (ARIA labels, focus states)
- Responsive design
- Clean code structure

## Credits

Built by [Rory Flint](https://rory.codes)

Inspired by the viral Shia LaBeouf motivational video: [Just Do It](https://www.youtube.com/watch?v=ZXsQAXx_ao0)

## License

This project is open source and available under the MIT License.
