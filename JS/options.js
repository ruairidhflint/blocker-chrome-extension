class ItemList {
  constructor(list) {
    this.blockedList = list || [];
    this.app = this.getElement("#root-options");
    this.list = this.createElement("ul", "list");
    this.form = this.getElement("#options-form");
    this.input = this.getElement("#option-input");

    this.onSubmit = this.onSubmit.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.form.addEventListener("submit", this.onSubmit);

    this.app.append(this.list);
    this.displayList(this.blockedList);
  }

  // Create HTML element
  createElement(tag, className) {
    const element = document.createElement(tag);
    if (className) element.classList.add(className);
    return element;
  }

  // Get element from DOM
  getElement(selector) {
    const element = document.querySelector(selector);
    if (!element) {
      throw new Error(`Element not found: ${selector}`);
    }
    return element;
  }

  // Display blocked list
  displayList(blockedList) {
    // Clear existing list
    this.list.innerHTML = "";

    if (blockedList.length === 0) {
      const p = this.createElement("p", "empty-blocked-list");
      p.textContent = "Nothing here yet!";
      this.list.append(p);
    } else {
      blockedList.forEach((item) => {
        const li = this.createElement("li", "blocked-list-item");
        li.id = item;

        const span = this.createElement("span", "blocker-list-text");
        span.textContent = item;

        const image = this.createElement("img", "blocker-list-img");
        image.src = `https://www.google.com/s2/favicons?domain=${item}`;
        image.alt = `Favicon for ${item}`;

        const deleteButton = this.createElement(
          "button",
          "blocker-list-button"
        );
        deleteButton.textContent = "×";
        deleteButton.setAttribute(
          "aria-label",
          `Remove ${item} from blocklist`
        );
        deleteButton.addEventListener("click", () => this.deleteItem(item));

        li.append(image, span, deleteButton);
        this.list.append(li);
      });
    }
  }

  // Delete item from blocked list
  async deleteItem(id) {
    try {
      const updatedBlockedList = this.blockedList.filter((item) => item !== id);

      await chrome.storage.sync.set({
        shiaBlocked: JSON.stringify(updatedBlockedList),
      });

      this.blockedList = updatedBlockedList;
      this.displayList(this.blockedList);
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  }

  // Add new item to blocked list
  async addNewItem(newItem) {
    try {
      this.blockedList = [...this.blockedList, newItem];

      await chrome.storage.sync.set({
        shiaBlocked: JSON.stringify(this.blockedList),
      });

      this.displayList(this.blockedList);
      this.resetInput();
    } catch (error) {
      console.error("Error adding new item:", error);
    }
  }

  // Reset input field
  resetInput() {
    this.input.style.border = "1px solid rgb(230, 230, 230)";
    this.input.placeholder = "Add Website to Blocklist eg. instagram.com";
    this.input.value = "";
  }

  // Set input error state
  setInputError(message) {
    this.input.value = "";
    this.input.placeholder = message;
    this.input.style.border = "1px solid red";
    this.input.focus();
  }

  // Handle form submission
  async onSubmit(e) {
    e.preventDefault();

    const inputValue = this.input.value.trim();

    if (!inputValue) {
      this.setInputError("Please enter a website");
      return;
    }

    if (this.checkURLRepetition(inputValue)) {
      this.setInputError("URL already blocked");
      return;
    }

    if (this.validateURL(inputValue)) {
      await this.addNewItem(inputValue);
    } else {
      this.setInputError("Invalid URL");
    }
  }

  // Validate URL format
  validateURL(url) {
    // Simple domain validation - allows domains like "instagram.com" or "www.instagram.com"
    const domainRegex =
      /^([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/;
    return domainRegex.test(url);
  }

  // Check if URL already exists in blocked list
  checkURLRepetition(url) {
    return this.blockedList.some(
      (item) => item.includes(url) || url.includes(item)
    );
  }
}

// Initialize the app
async function initializeApp() {
  try {
    const data = await chrome.storage.sync.get("shiaBlocked");
    const blockedList = JSON.parse(data.shiaBlocked || "[]");
    new ItemList(blockedList);
  } catch (error) {
    console.error("Error initializing app:", error);
  }
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", initializeApp);
